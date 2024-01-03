import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { ActivityRepository } from './activity.repository';
import { ActivityTypeOrmEntity } from './activity.typeorm.entity';

export class ActivityRepositoryImpl implements ActivityRepository {
  constructor(private readonly typeormRepository: Repository<ActivityTypeOrmEntity>) {}

  findByOwnerSince(ownerAccountId: number, since: Date): Promise<ActivityTypeOrmEntity[]> {
    return this.typeormRepository.find({ where: { ownerAccountId, timestamp: MoreThanOrEqual(since) } });
  }

  getDepositBalanceUntil(accountId: number, until: Date): Promise<number | null> {
    return this.typeormRepository.sum('amount', {
      sourceAccountId: accountId,
      targetAccountId: accountId,
      timestamp: LessThanOrEqual(until),
    });
  }

  getWithdrawalBalanceUntil(accountId: number, until: Date): Promise<number | null> {
    return this.typeormRepository.sum('amount', {
      sourceAccountId: accountId,
      ownerAccountId: accountId,
      timestamp: LessThanOrEqual(until),
    });
  }
}
