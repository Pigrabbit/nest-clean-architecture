import { Controller, Param, Post } from '@nestjs/common';
import { SendMoneyCommand, SendMoneyUseCase } from 'account/application/port/in';
import { AccountId, Money } from 'account/domain';

@Controller()
export class SendMoneyController {
  constructor(private readonly sendMoneyUseCase: SendMoneyUseCase) {}

  @Post('/accounts/send/:sourceAccountId/:targetAccountId/:amount')
  sendMoney(
    @Param('sourceAccountId') sourceAccountId: string,
    @Param('targetAccountId') targetAccountId: string,
    @Param('amount') amount: number,
  ) {
    const command = new SendMoneyCommand(
      new AccountId(sourceAccountId),
      new AccountId(targetAccountId),
      Money.of(amount),
    );
    this.sendMoneyUseCase.sendMoney(command);
  }
}
