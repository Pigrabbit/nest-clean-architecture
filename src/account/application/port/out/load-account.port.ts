import { AccountId, Account } from '../../../domain';

export abstract class LoadAccountPort {
  abstract loadAccount(accountId: AccountId, baselineDate: Date): Promise<Account>;
}
