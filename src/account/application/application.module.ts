import { DynamicModule, Module } from '@nestjs/common';
import { PersistenceAdapterModule } from 'adapter/out/persistence';
import { AccountPersistenceAdapter } from 'adapter/out/persistence/account-persistence.adapter';
import { GetAccountBalanceService, NoOpAccountLock, SendMoneyService } from './service';

@Module({
  imports: [PersistenceAdapterModule],
})
export class AccountApplicationModule {
  static SEND_MONEY_USE_CASE = 'SendMoneyUseCase';
  static GET_ACCOUNT_BALANCE_QUERY = 'GetAccountBalanceQuery';

  static register(): DynamicModule {
    return {
      module: AccountApplicationModule,
      providers: [
        {
          provide: AccountApplicationModule.SEND_MONEY_USE_CASE,
          useFactory: (accountPersistenceAdapter: AccountPersistenceAdapter) => {
            return new SendMoneyService(accountPersistenceAdapter, new NoOpAccountLock(), accountPersistenceAdapter);
          },
          inject: [AccountPersistenceAdapter],
        },
        {
          provide: AccountApplicationModule.GET_ACCOUNT_BALANCE_QUERY,
          useFactory: (accountPersistenceAdapter: AccountPersistenceAdapter) => {
            return new GetAccountBalanceService(accountPersistenceAdapter);
          },
          inject: [AccountPersistenceAdapter],
        },
      ],
      exports: [AccountApplicationModule.SEND_MONEY_USE_CASE, AccountApplicationModule.GET_ACCOUNT_BALANCE_QUERY],
    };
  }
}
