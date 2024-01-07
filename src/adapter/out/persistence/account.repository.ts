import { AccountId } from 'account/domain';
import { Repository } from 'typeorm';
import { AccountTypeOrmEntity } from './account.typeorm.entity';

export interface AccountRepository extends Repository<AccountTypeOrmEntity> {
  findById(accountId: AccountId): Promise<AccountTypeOrmEntity>;
}
