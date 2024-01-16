import { Account } from "account/domain";

export abstract class UpdateAccountStatePort {
  abstract updateActivities(account: Account): void | Promise<void>;
}
