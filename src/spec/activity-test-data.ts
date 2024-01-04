import { AccountId, Activity, ActivityId, Money } from 'account/domain';

class ActivityBuilder {
  private id: ActivityId;
  private ownerAccountId: AccountId;
  private sourceAccountId: AccountId;
  private targetAccountId: AccountId;
  private timestamp: Date;
  private money: Money;

  withId(id: ActivityId) {
    this.id = id;
    return this;
  }

  withOwnerAccount(accountId: AccountId) {
    this.ownerAccountId = accountId;
    return this;
  }

  withSourceAccount(accountId: AccountId) {
    this.sourceAccountId = accountId;
    return this;
  }

  withTargetAccount(accountId: AccountId) {
    this.targetAccountId = accountId;
    return this;
  }

  withTimestamp(timestamp: Date) {
    this.timestamp = timestamp;
    return this;
  }

  withMoney(money: Money) {
    this.money = money;
    return this;
  }

  build(): Activity {
    return new Activity({
      id: this.id,
      ownerAccountId: this.ownerAccountId,
      sourceAccountId: this.sourceAccountId,
      targetAccountId: this.targetAccountId,
      timestamp: this.timestamp,
      money: this.money,
    });
  }
}

export const defaultActivity = () =>
  new ActivityBuilder()
    .withOwnerAccount(new AccountId(42))
    .withSourceAccount(new AccountId(42))
    .withTargetAccount(new AccountId(41))
    .withTimestamp(new Date())
    .withMoney(Money.of(999));
