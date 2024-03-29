import { Injectable } from '@nestjs/common';
import { LoadAccountPort, UpdateAccountStatePort } from 'account/application/port/out';
import { Account, AccountId } from 'account/domain';
import { AccountMapper } from './mapper';
import { AccountRepository, ActivityRepository } from './repository';

/**
 * 1 persistence adapter per domain aggregate
 */
@Injectable()
export class AccountPersistenceAdapter implements LoadAccountPort, UpdateAccountStatePort {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly activityRepository: ActivityRepository,
    private readonly accountMapper: AccountMapper,
  ) {}

  async loadAccount(accountId: AccountId, baselineDate: Date): Promise<Account> {
    const account = await this.accountRepository.findById(accountId);
    const activities = await this.activityRepository.findByOwnerSince(accountId.value, baselineDate);
    const withdrawalBalance = this.orZero(
      await this.activityRepository.getWithdrawalBalanceUntil(accountId.value, baselineDate),
    );
    const depositBalance = this.orZero(
      await this.activityRepository.getDepositBalanceUntil(accountId.value, baselineDate),
    );

    return this.accountMapper.mapToDomainEntity({ account, activities, withdrawalBalance, depositBalance });
  }

  async updateActivities(account: Account): Promise<void> {
    for (const activity of account.activityWindow.getActivities()) {
      if (activity.getId() !== null) {
        continue;
      }
      await this.activityRepository.save(this.accountMapper.mapToTypeOrmEntity(activity, this.activityRepository));
    }
  }

  private orZero(value: number | null | undefined): number {
    return value ?? 0;
  }
}
