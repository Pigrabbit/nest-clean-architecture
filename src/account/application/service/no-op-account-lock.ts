import { AccountId } from 'account/domain';
import { AccountLock } from '../port/out';

export class NoOpAccountLock implements AccountLock {
  lockAccount(accountId: AccountId): void {
    return;
  }
  releaseAccount(accountId: AccountId): void {
    return;
  }
}
