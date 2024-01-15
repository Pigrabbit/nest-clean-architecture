import { Module } from '@nestjs/common';
import { AccountApplicationModule } from 'account/application';
import { WebAdapterModule } from 'adapter/in/web';
import { PersistenceAdapterModule } from 'adapter/out/persistence';

@Module({
  imports: [WebAdapterModule, AccountApplicationModule, PersistenceAdapterModule],
})
export class AppModule {}
