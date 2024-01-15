import { Repository } from 'typeorm';
import { ActivityTypeOrmEntity } from '../entity';

export abstract class ActivityRepository extends Repository<ActivityTypeOrmEntity> {
  abstract findByOwnerSince(ownerAccountId: number, since: Date): Promise<ActivityTypeOrmEntity[]>;
  abstract getDepositBalanceUntil(accountId: number, until: Date): Promise<number | null | undefined>;
  abstract getWithdrawalBalanceUntil(accountId: number, until: Date): Promise<number | null | undefined>;
}
