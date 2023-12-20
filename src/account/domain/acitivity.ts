import { AccountId } from "./account-id";
import { ActivityId } from "./activity-id";
import { Money } from "./money";

export class Activity {
  private _id: ActivityId | null;

  constructor(
    private readonly ownerAccountId: AccountId,
    private readonly sourceAccountId: AccountId,
    private readonly targetAccountId: AccountId,
    private readonly timestamp: Date,
    private readonly money: Money,
  ) {
    this._id = null;
  }

  get id(): ActivityId | null {
    return this.id;
  }

  getMoney() {
    return this.money;
  }

  getTargetAccountId() {
    return this.targetAccountId;
  }

  getSourceAccountId() {
    return this.sourceAccountId;
  }
}
