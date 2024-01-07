import { Module } from '@nestjs/common';
import { AccountApplicationModule } from 'account/application/application.module';
import { WebAdapterModule } from 'adapter/in/web';
import { PersistenceAdapterModule } from 'adapter/out/persistence';

@Module({
  imports: [WebAdapterModule, PersistenceAdapterModule.register(), AccountApplicationModule.register()],
})
export class AppModule {}
