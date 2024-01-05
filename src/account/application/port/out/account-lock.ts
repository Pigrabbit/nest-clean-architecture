import { AccountId } from 'account/domain';

export interface AccountLock {
  lockAccount(accountId: AccountId): void | Promise<void>;
  releaseAccount(accountId: AccountId): void | Promise<void>;
}
