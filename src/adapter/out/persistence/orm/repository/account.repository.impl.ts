import { InjectRepository } from '@nestjs/typeorm';
import { AccountId } from 'account/domain';
import { Repository } from 'typeorm';
import { AccountRepository } from './account.repository';
import { AccountTypeOrmEntity } from '../entity';

export class AccountRepositoryImpl extends Repository<AccountTypeOrmEntity> implements AccountRepository {
  constructor(
    @InjectRepository(AccountTypeOrmEntity)
    private readonly typeormRepository: Repository<AccountTypeOrmEntity>,
  ) {
    super(typeormRepository.target, typeormRepository.manager, typeormRepository.queryRunner);
  }

  async findById(accountId: AccountId): Promise<AccountTypeOrmEntity> {
    const result = await this.typeormRepository.findOneBy({ id: accountId.value });
    if (!result) {
      throw new Error(`Account not found. accountId=${accountId.value}`);
    }
    return result;
  }
}
