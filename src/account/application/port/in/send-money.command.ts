import { Money, AccountId } from '../../../domain';

export class SendMoneyCommand {
  private money: Money;

  constructor(private readonly sourceAccountId: AccountId, private readonly targetAccountId: AccountId, money: Money) {
    if (money.isPositive()) {
      this.money = money;
    } else {
      throw new Error('음수입니다');
    }
  }
}
