import { createMock } from '@golevelup/ts-jest';

import { AccountId, ActivityWindow, Money } from 'account/domain';
import { defaultAccount } from '../../../../spec/util';
import { SendMoneyCommand } from '../port/in';
import { AccountLock, LoadAccountPort, UpdateAccountStatePort } from '../port/out';
import { SendMoneyService } from './send-money.service';

describe('SendMoneyService', () => {
  describe('sendMoney', () => {
    const loadAccount = createMock<LoadAccountPort>();
    const accountLock = createMock<AccountLock>();
    const updateAccountState = createMock<UpdateAccountStatePort>();
    const sendMoneyService = new SendMoneyService(loadAccount, accountLock, updateAccountState);

    it('should success transaction', async () => {
      const sourceAccount = defaultAccount()
        .withBaselineBalance(Money.of(0))
        .withActivityWindow(new ActivityWindow([]))
        .build();
      const targetAccount = defaultAccount()
        .withAccountId(new AccountId(1))
        .withBaselineBalance(Money.of(0))
        .withActivityWindow(new ActivityWindow([]))
        .build();

      const money = Money.of(500);
      const command = new SendMoneyCommand(sourceAccount.id, targetAccount.id, money);

      const success = await sendMoneyService.sendMoney(command);
      expect(success).toBe(true);

      expect(loadAccount.loadAccount).toHaveBeenCalledTimes(2);
      expect(loadAccount.loadAccount).toHaveBeenNthCalledWith(1, sourceAccount.id, expect.any(Date));
      expect(loadAccount.loadAccount).toHaveBeenNthCalledWith(2, targetAccount.id, expect.any(Date));

      expect(accountLock.lockAccount).toHaveBeenCalledTimes(2);
      expect(updateAccountState.updateActivities).toHaveBeenCalledTimes(2);
    });
  });
});
