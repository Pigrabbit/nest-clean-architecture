import { AccountId, Money } from 'account/domain';
import { SendMoneyCommand } from './send-money.command';

describe('SendMoneyCommand', () => {
  it('should create instance', () => {
    // given
    const sourceAccountId = new AccountId(1);
    const targetAccountId = new AccountId(2);
    const money = new Money(100);
    // when
    const command = new SendMoneyCommand(sourceAccountId, targetAccountId, money);
    // then
    expect(command).toBeDefined();
  });

  it('should throw Error when sourceAccountId is invalid', () => {
    // given
    // @ts-expect-error test
    const sourceAccountId = new AccountId();
    const targetAccountId = new AccountId(2);
    const money = new Money(100);
    // then
    expect(() => {
      const command = new SendMoneyCommand(sourceAccountId, targetAccountId, money);
    }).toThrow('SendMoneyCommand Validation failed');
  });

  it('should throw Error when targetAccountId is invalid', () => {
    // given
    const sourceAccountId = new AccountId(1);
    // @ts-expect-error test
    const targetAccountId = new AccountId();
    const money = new Money(100);
    // then
    expect(() => {
      const command = new SendMoneyCommand(sourceAccountId, targetAccountId, money);
    }).toThrow('SendMoneyCommand Validation failed');
  });

  it('should throw Error when money is invalid', () => {
    // given
    const sourceAccountId = new AccountId(1);
    const targetAccountId = new AccountId(2);
    const money = new Money(-100);
    // then
    expect(() => {
      const command = new SendMoneyCommand(sourceAccountId, targetAccountId, money);
    }).toThrow('SendMoneyCommand Validation failed');
  });
});
