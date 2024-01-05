import { AccountId } from 'account/domain';

export interface AccountLock {
  lockAccount(accountId: AccountId): void;
  releaseAccount(accountId: AccountId): void;
}
