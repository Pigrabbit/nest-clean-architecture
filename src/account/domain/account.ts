import { AccountId } from './account-id';
import { ActivityWindow } from './acitivity-window';
import { Activity } from './acitivity';
import { Money } from './money';

export class Account {
  private _id: AccountId;
  private _baselineBalance: Money;
  private _activityWindow: ActivityWindow;

  static withId(accountId: AccountId, baselineBalance: Money, activityWindow: ActivityWindow): Account {
    return new Account(accountId, baselineBalance, activityWindow);
  }

  private constructor(accountId: AccountId, baselineBalance: Money, activityWindow: ActivityWindow) {
    this._id = accountId;
    this._baselineBalance = baselineBalance;
    this._activityWindow = activityWindow;
  }

  get id() {
    return this._id;
  }

  get baselineBalance() {
    return this._baselineBalance;
  }

  get activityWindow() {
    return this._activityWindow;
  }

  calculateBalance(): Money {
    return Money.add(this._baselineBalance, this._activityWindow.calculateBalance(this.id));
  }

  deposit(money: Money, sourceAccountId: AccountId): boolean {
    const deposit = new Activity({
      ownerAccountId: this.id,
      sourceAccountId,
      targetAccountId: this.id,
      timestamp: new Date(),
      money,
    });
    this.activityWindow.addActivity(deposit);
    return true;
  }

  withdraw(money: Money, targetAccountId: AccountId): boolean {
    if (!this.mayWithdraw(money)) {
      return false;
    }

    const withdrawal = new Activity({
      ownerAccountId: this.id,
      sourceAccountId: this.id,
      targetAccountId,
      timestamp: new Date(),
      money,
    });
    this.activityWindow.addActivity(withdrawal);
    return true;
  }

  mayWithdraw(money: Money): boolean {
    return Money.add(this.calculateBalance(), money.negate()).isPositive();
  }
}
