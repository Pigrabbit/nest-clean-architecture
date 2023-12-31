import { AccountId } from './account-id';
import { ActivityId } from './activity-id';
import { Money } from './money';

export class Activity {
  private readonly id: ActivityId | null;
  private readonly ownerAccountId: AccountId;
  private readonly sourceAccountId: AccountId;
  private readonly targetAccountId: AccountId;
  private readonly timestamp: Date;
  private readonly money: Money;

  constructor({
    ownerAccountId,
    sourceAccountId,
    targetAccountId,
    timestamp,
    money,
    id = null,
  }: {
    ownerAccountId: AccountId;
    sourceAccountId: AccountId;
    targetAccountId: AccountId;
    timestamp: Date;
    money: Money;
    id?: ActivityId | null;
  }) {
    this.ownerAccountId = ownerAccountId;
    this.sourceAccountId = sourceAccountId;
    this.targetAccountId = targetAccountId;
    this.timestamp = timestamp;
    this.money = money;
    this.id = id;
  }

  getId() {
    return this.id;
  }

  getOwnerAccountId() {
    return this.ownerAccountId;
  }

  getTargetAccountId() {
    return this.targetAccountId;
  }

  getSourceAccountId() {
    return this.sourceAccountId;
  }

  getTimestamp() {
    return this.timestamp;
  }

  getMoney() {
    return this.money;
  }
}
