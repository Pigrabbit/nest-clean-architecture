import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { ActivityRepository } from './activity.repository';
import { ActivityTypeOrmEntity } from '../entity';

export class ActivityRepositoryImpl extends Repository<ActivityTypeOrmEntity> implements ActivityRepository {
  constructor(
    @InjectRepository(ActivityTypeOrmEntity)
    private readonly typeormRepository: Repository<ActivityTypeOrmEntity>,
  ) {
    super(typeormRepository.target, typeormRepository.manager, typeormRepository.queryRunner);
  }

  findByOwnerSince(ownerAccountId: number, since: Date): Promise<ActivityTypeOrmEntity[]> {
    return this.typeormRepository.find({ where: { ownerAccountId, timestamp: MoreThanOrEqual(since) } });
  }

  getDepositBalanceUntil(accountId: number, until: Date): Promise<number | null> {
    return this.typeormRepository.sum('amount', {
      ownerAccountId: accountId,
      targetAccountId: accountId,
      timestamp: LessThanOrEqual(until),
    });
  }

  getWithdrawalBalanceUntil(accountId: number, until: Date): Promise<number | null> {
    return this.typeormRepository.sum('amount', {
      ownerAccountId: accountId,
      sourceAccountId: accountId,
      timestamp: LessThanOrEqual(until),
    });
  }
}
