import { AccountId } from 'account/domain';
import { Repository } from 'typeorm';
import { AccountRepository } from './account.repository';
import { AccountTypeOrmEntity } from './account.typeorm.entity';

export class AccountRepositoryImpl implements AccountRepository {
  constructor(private readonly typeormRepository: Repository<AccountTypeOrmEntity>) {}

  async findById(accountId: AccountId): Promise<AccountTypeOrmEntity> {
    const result = await this.typeormRepository
      .createQueryBuilder('account')
      .where('account.id = :id', { id: accountId.value })
      .getOne();
    if (!result) {
      throw new Error(`Account not found. accountId=${accountId.value}`);
    }
    return result;
  }
}
