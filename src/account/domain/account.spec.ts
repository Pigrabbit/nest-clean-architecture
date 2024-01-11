import { defaultAccount, defaultActivity } from 'spec/util';
import { AccountId } from './account-id';
import { ActivityWindow } from './acitivity-window';
import { Money } from './money';

describe('Account', () => {
  it('should success withdrawl', async () => {
    const [accountId1, accountId2] = [new AccountId(1), new AccountId(2)];
    const account = defaultAccount()
      .withAccountId(accountId1)
      .withBaselineBalance(Money.of(555))
      .withActivityWindow(
        new ActivityWindow([
          defaultActivity().withTargetAccount(accountId1).withMoney(Money.of(999)).build(),
          defaultActivity().withTargetAccount(accountId1).withMoney(Money.of(1)).build(),
        ]),
      )
      .build();

    const success = account.withdraw(Money.of(555), accountId2);
    expect(success).toBe(true);
    expect(account.activityWindow.getActivities()).toHaveLength(3);
    expect(account.calculateBalance()).toEqual(Money.of(1000));
  });
});
