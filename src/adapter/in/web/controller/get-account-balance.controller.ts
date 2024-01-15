import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { GetAccountBalanceQuery, GET_ACCOUNT_BALANCE_QUERY_INJECTION_TOKEN } from 'account/application/port/in';
import { AccountId } from 'account/domain';

@Controller()
export class GetAccountBalanceController {
  constructor(
    @Inject(GET_ACCOUNT_BALANCE_QUERY_INJECTION_TOKEN)
    private readonly getAccountBalanceQuery: GetAccountBalanceQuery,
  ) {}

  @Get('/accounts/:accountId/balance')
  getAccountBalance(@Param('accountId', ParseIntPipe) accountId: number) {
    return this.getAccountBalanceQuery.getAccountBalance(new AccountId(accountId));
  }
}
