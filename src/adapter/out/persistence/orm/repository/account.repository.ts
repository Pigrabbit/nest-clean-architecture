import { AccountId } from 'account/domain';
import { Repository } from 'typeorm';
import { AccountTypeOrmEntity } from '../entity';

export abstract class AccountRepository extends Repository<AccountTypeOrmEntity> {
  abstract findById(accountId: AccountId): Promise<AccountTypeOrmEntity>;
}
