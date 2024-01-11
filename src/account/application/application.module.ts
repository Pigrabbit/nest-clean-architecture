import { DynamicModule, Module } from '@nestjs/common';
import { PersistenceAdapterModule } from 'adapter/out/persistence';
import { GET_ACCOUNT_BALANCE_QUERY_INJECTION_TOKEN, SEND_MONEY_USE_CASE_INJECTION_TOKEN } from './port/in';
import { ACCOUNT_LOCK_INJECTION_TOKEN } from './port/out';
import { GetAccountBalanceService, NoOpAccountLock, SendMoneyService } from './service';

@Module({
  imports: [PersistenceAdapterModule],
  providers: [
    { provide: SEND_MONEY_USE_CASE_INJECTION_TOKEN, useClass: SendMoneyService },
    { provide: GET_ACCOUNT_BALANCE_QUERY_INJECTION_TOKEN, useClass: GetAccountBalanceService },
    { provide: ACCOUNT_LOCK_INJECTION_TOKEN, useClass: NoOpAccountLock },
  ],
  exports: [SEND_MONEY_USE_CASE_INJECTION_TOKEN, GET_ACCOUNT_BALANCE_QUERY_INJECTION_TOKEN],
})
export class AccountApplicationModule {}
