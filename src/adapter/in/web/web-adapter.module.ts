import { Module } from '@nestjs/common';
import { AccountApplicationModule } from 'account/application/application.module';
import { SendMoneyController } from './send-money.controller';

@Module({
  imports: [AccountApplicationModule.register()],
  controllers: [SendMoneyController],
})
export class WebAdapterModule {}
