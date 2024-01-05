import { Controller, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { SendMoneyCommand, SendMoneyUseCase } from 'account/application/port/in';
import { AccountId, Money } from 'account/domain';

@Controller()
export class SendMoneyController {
  constructor(@Inject('SendMoneyUseCase') private readonly sendMoneyUseCase: SendMoneyUseCase) {}

  @Post('/accounts/send/:sourceAccountId/:targetAccountId/:amount')
  sendMoney(
    @Param('sourceAccountId', ParseIntPipe) sourceAccountId: number,
    @Param('targetAccountId', ParseIntPipe) targetAccountId: number,
    @Param('amount', ParseIntPipe) amount: number,
  ) {
    const command = new SendMoneyCommand(
      new AccountId(sourceAccountId),
      new AccountId(targetAccountId),
      Money.of(amount),
    );
    this.sendMoneyUseCase.sendMoney(command);
  }
}
