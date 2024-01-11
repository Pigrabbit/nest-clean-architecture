import { Module } from '@nestjs/common';
import { AccountApplicationModule } from 'account/application/application.module';
import { GetAccountBalanceController } from './get-account-balance.controller';
import { SendMoneyController } from './send-money.controller';

@Module({
  imports: [AccountApplicationModule],
  controllers: [SendMoneyController, GetAccountBalanceController],
})
export class WebAdapterModule {}
