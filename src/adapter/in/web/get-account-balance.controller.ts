import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { AccountApplicationModule } from 'account/application/application.module';
import { GetAccountBalanceQuery } from 'account/application/port/in';
import { AccountId } from 'account/domain';

@Controller()
export class GetAccountBalanceController {
  constructor(
    @Inject(AccountApplicationModule.GET_ACCOUNT_BALANCE_QUERY)
    private readonly getAccountBalanceQuery: GetAccountBalanceQuery,
  ) {}

  @Get('/accounts/:accountId/balance')
  getAccountBalance(@Param('accountId', ParseIntPipe) accountId: number) {
    return this.getAccountBalanceQuery.getAccountBalance(new AccountId(accountId));
  }
}
