import { Repository } from 'typeorm';
import { ActivityTypeOrmEntity } from './activity.typeorm.entity';

export interface ActivityRepository {
  create(entityLike: Partial<ActivityTypeOrmEntity>): ActivityTypeOrmEntity;
  findByOwnerSince(ownerAccountId: number, since: Date): Promise<ActivityTypeOrmEntity[]>;
  getDepositBalanceUntil(accountId: number, until: Date): Promise<number | null | undefined>;
  getWithdrawalBalanceUntil(accountId: number, until: Date): Promise<number | null | undefined>;
  save(activity: ActivityTypeOrmEntity): Promise<ActivityTypeOrmEntity>;
}
