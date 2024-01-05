import { Account } from "account/domain";

export interface UpdateAccountStatePort {
  updateActivities(account: Account): void | Promise<void>;
}
