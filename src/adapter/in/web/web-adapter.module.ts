import { Module } from '@nestjs/common';
import { AccountApplicationModule } from 'account/application/application.module';
import { SendMoneyController, GetAccountBalanceController } from './controller';

@Module({
  imports: [AccountApplicationModule],
  controllers: [SendMoneyController, GetAccountBalanceController],
})
export class WebAdapterModule {}
