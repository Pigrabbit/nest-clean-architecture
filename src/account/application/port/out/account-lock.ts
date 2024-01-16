import { AccountId } from 'account/domain';

export abstract class AccountLock {
  abstract lockAccount(accountId: AccountId): void;
  abstract releaseAccount(accountId: AccountId): void;
}
