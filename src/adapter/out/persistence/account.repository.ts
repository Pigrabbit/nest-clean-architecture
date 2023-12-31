import { AccountId } from 'account/domain';
import { AccountTypeOrmEntity } from './account.typeorm.entity';

export interface AccountRepository {
  findById(accountId: AccountId): Promise<AccountTypeOrmEntity>;
}
