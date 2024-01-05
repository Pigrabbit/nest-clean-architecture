import { Account, AccountId, Activity, ActivityId, ActivityWindow, Money } from 'account/domain';
import { Repository } from 'typeorm';
import { AccountTypeOrmEntity } from './account.typeorm.entity';
import { ActivityRepository } from './activity.repository';
import { ActivityTypeOrmEntity } from './activity.typeorm.entity';

export class AccountMapper {
  mapToDomainEntity({
    account,
    activities,
    withdrawalBalance,
    depositBalance,
  }: {
    account: AccountTypeOrmEntity;
    activities: ActivityTypeOrmEntity[];
    withdrawalBalance: number;
    depositBalance: number;
  }): Account {
    const baselineBalance = Money.subtract(Money.of(depositBalance), Money.of(withdrawalBalance));
    return Account.withId(new AccountId(account.id), baselineBalance, this.mapToActivitiyWindow(activities));
  }

  mapToActivitiyWindow(activities: ActivityTypeOrmEntity[]): ActivityWindow {
    const mappedActivities = activities.map(
      (activity) =>
        new Activity({
          id: new ActivityId(activity.id),
          ownerAccountId: new AccountId(activity.ownerAccountId),
          sourceAccountId: new AccountId(activity.sourceAccountId),
          targetAccountId: new AccountId(activity.targetAccountId),
          timestamp: activity.timestamp,
          money: Money.of(activity.amount),
        }),
    );

    return new ActivityWindow(mappedActivities);
  }

  mapToTypeOrmEntity(activity: Activity, activityRepository: ActivityRepository): ActivityTypeOrmEntity {
    return activityRepository.create({
      id: activity.getId() === null ? undefined : (activity.getId() as ActivityId).id,
      timestamp: activity.getTimestamp(),
      ownerAccountId: activity.getOwnerAccountId().value,
      sourceAccountId: activity.getSourceAccountId().value,
      targetAccountId: activity.getTargetAccountId().value,
      amount: activity.getMoney().getAmount(),
    });
  }
}
