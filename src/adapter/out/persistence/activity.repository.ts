import { ActivityTypeOrmEntity } from './activity.typeorm.entity';

export interface ActivityRepository {
  findByOwnerSince(ownerAccountId: number, since: Date): Promise<ActivityTypeOrmEntity[]>;
  getDepositBalanceUntil(accountId: number, until: Date): Promise<number | null | undefined>;
  getWithdrawalBalanceUntil(accountId: number, until: Date): Promise<number | null | undefined>;
}
