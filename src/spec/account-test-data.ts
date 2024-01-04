import { Account, AccountId, ActivityWindow, Money } from 'account/domain';
import { defaultActivity } from './activity-test-data';

class AccountBuilder {
  private _id: AccountId;
  private _baselineBalance: Money;
  private _activityWindow: ActivityWindow;

  withAccountId(id: AccountId) {
    this._id = id;
    return this;
  }

  withBaselineBalance(baselineBalance: Money) {
    this._baselineBalance = baselineBalance;
    return this;
  }

  withActivityWindow(activityWindow: ActivityWindow) {
    this._activityWindow = activityWindow;
    return this;
  }

  build(): Account {
    return Account.withId(this._id, this._baselineBalance, this._activityWindow);
  }
}

export const defaultAccount = () =>
  new AccountBuilder()
    .withAccountId(new AccountId(42))
    .withBaselineBalance(Money.of(999))
    .withActivityWindow(new ActivityWindow([defaultActivity().build(), defaultActivity().build()]));
