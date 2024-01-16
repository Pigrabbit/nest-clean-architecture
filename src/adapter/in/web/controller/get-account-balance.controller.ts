import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { GetAccountBalanceQuery } from 'account/application/port/in';
import { AccountId } from 'account/domain';

@Controller()
export class GetAccountBalanceController {
  constructor(private readonly getAccountBalanceQuery: GetAccountBalanceQuery) {}

  @Get('/accounts/:accountId/balance')
  getAccountBalance(@Param('accountId', ParseIntPipe) accountId: number) {
    return this.getAccountBalanceQuery.getAccountBalance(new AccountId(accountId));
  }
}
