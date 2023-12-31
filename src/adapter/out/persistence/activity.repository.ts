import { ActivityTypeOrmEntity } from './activity.typeorm.entity';

export interface ActivityRepository {
  findByOwnerSince(ownerAccountId: string, since: Date): Promise<ActivityTypeOrmEntity[]>;
  getDepositBalanceUntil(accountId: string, until: Date): Promise<number | null>;
  getWithdrawalBalanceUntil(accountId: string, until: Date): Promise<number | null>;
}
