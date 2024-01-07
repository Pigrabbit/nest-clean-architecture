import { DynamicModule, Module } from '@nestjs/common';
import { PersistenceAdapterModule } from 'adapter/out/persistence';
import { GetAccountBalanceService, NoOpAccountLock, SendMoneyService } from './service';

@Module({
  imports: [PersistenceAdapterModule.register()],
})
export class AccountApplicationModule {
  static SEND_MONEY_USE_CASE = 'SendMoneyUseCase';
  static GET_ACCOUNT_BALANCE_QUERY = 'GetAccountBalanceQuery';
  static ACCOUNT_LOCK = 'AccountLock';

  static register(): DynamicModule {
    return {
      module: AccountApplicationModule,
      providers: [
        { provide: AccountApplicationModule.SEND_MONEY_USE_CASE, useClass: SendMoneyService },
        { provide: AccountApplicationModule.GET_ACCOUNT_BALANCE_QUERY, useClass: GetAccountBalanceService },
        { provide: AccountApplicationModule.ACCOUNT_LOCK, useClass: NoOpAccountLock },
      ],
      exports: [AccountApplicationModule.SEND_MONEY_USE_CASE, AccountApplicationModule.GET_ACCOUNT_BALANCE_QUERY],
    };
  }
}
