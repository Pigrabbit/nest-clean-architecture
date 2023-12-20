import { AccountId } from "./account-id";
import { Activity } from "./acitivity";
import { Money } from "./money";

export class ActivityWindow {
  private activityList: Activity[];

  constructor() {
    this.activityList = [];
  }

  addActivity(activity: Activity) {
    this.activityList = this.activityList.concat(activity);
  }

  getStartTimestamp() {}

  getEndTimestamp() {}

  getActivities(): Activity[] {
    return [...this.activityList];
  }

  calculateBalance(accountId: AccountId): Money {
    const depositBalance = this.activityList
      .filter((activity) => activity.getTargetAccountId() === accountId)
      .map((activity) => activity.getMoney())
      .reduce((acc, money) => {
        return Money.add(acc, money);
      }, new Money());

    const withdrawBalance = this.activityList
      .filter((activity) => activity.getSourceAccountId() === accountId)
      .map((activity) => activity.getMoney())
      .reduce((acc, money) => {
        return Money.add(acc, money);
      }, new Money());

    return Money.add(depositBalance, withdrawBalance.negate());
  }
}
