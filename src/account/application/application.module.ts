import { Module } from '@nestjs/common';
import { PersistenceAdapterModule } from 'adapter/out/persistence';
import { GetAccountBalanceQuery, SendMoneyUseCase } from './port/in';
import { AccountLock, LoadAccountPort, UpdateAccountStatePort } from './port/out';
import { GetAccountBalanceService, NoOpAccountLock, SendMoneyService } from './service';

@Module({
  imports: [PersistenceAdapterModule],
  providers: [
    {
      provide: SendMoneyUseCase,
      useFactory: (
        loadAccountPort: LoadAccountPort,
        accountLock: AccountLock,
        updateAccountStatePort: UpdateAccountStatePort,
      ) => new SendMoneyService(loadAccountPort, accountLock, updateAccountStatePort),
      inject: [LoadAccountPort, AccountLock, UpdateAccountStatePort],
    },
    {
      provide: GetAccountBalanceQuery,
      useFactory: (loadAccountPort: LoadAccountPort) => new GetAccountBalanceService(loadAccountPort),
      inject: [LoadAccountPort],
    },
    { provide: AccountLock, useClass: NoOpAccountLock },
  ],
  exports: [SendMoneyUseCase, GetAccountBalanceQuery],
})
export class AccountApplicationModule {}
