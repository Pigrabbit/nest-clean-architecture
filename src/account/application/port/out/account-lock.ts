import { AccountId } from "../../../domain";

export interface AccountLock {
  lockAccount(accountId: AccountId): void;
  releaseAccount(accountId: AccountId): void;
}
