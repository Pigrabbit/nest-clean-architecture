import { Account, AccountId, Activity, ActivityId, ActivityWindow, Money } from 'account/domain';
import { AccountTypeOrmEntity } from './account.typeorm.entity';
import { ActivityTypeOrmEntity } from './activity.typeorm.entity';

export class AccountMapper {
  mapToDomainEntity({
    account,
    activities,
    withdrawalBalance,
    depositBalance,
  }: {
    account: AccountTypeOrmEntity;
    activities: ActivityTypeOrmEntity[];
    withdrawalBalance: number;
    depositBalance: number;
  }): Account {
    const baselineBalance = Money.subtract(Money.of(depositBalance), Money.of(withdrawalBalance));
    return Account.withId(new AccountId(account.id), baselineBalance, this.mapToActivitiyWindow(activities));
  }

  mapToActivitiyWindow(activities: ActivityTypeOrmEntity[]): ActivityWindow {
    const mappedActivities = activities.map(
      (activity) =>
        new Activity({
          id: new ActivityId(activity.id),
          ownerAccountId: new AccountId(activity.ownerAccountId),
          sourceAccountId: new AccountId(activity.sourceAccountId),
          targetAccountId: new AccountId(activity.targetAccountId),
          timestamp: activity.timestamp,
          money: Money.of(activity.amount),
        }),
    );

    return new ActivityWindow(mappedActivities);
  }

  //   mapToTypeOrmEntity(activity: Activity) {
  //     return new ActivityTypeOrmEntity(
  //       activity.getId() === null ? null : activity.getId().id,
  //       activity.getTimestamp(),
  //       activity.getOwnerAccountId().value,
  //       activity.getSourceAccountId().value,
  //       activity.getTargetAccountId().value,
  //       activity.getMoney().getAmount(),
  //     );
  //   }
}
