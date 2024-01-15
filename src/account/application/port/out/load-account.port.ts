import { AccountId, Account } from '../../../domain';

export interface LoadAccountPort {
  loadAccount(accountId: AccountId, baselineDate: Date): Promise<Account>;
}
