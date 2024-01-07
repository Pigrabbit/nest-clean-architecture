import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountMapper } from './account-mapper';
import { AccountPersistenceAdapter } from './account-persistence.adapter';
import { AccountRepositoryImpl } from './account.repository.impl';
import { AccountTypeOrmEntity } from './account.typeorm.entity';
import { ActivityRepositoryImpl } from './activity.repository.impl';
import { ActivityTypeOrmEntity } from './activity.typeorm.entity';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([AccountTypeOrmEntity, ActivityTypeOrmEntity])],
})
export class PersistenceAdapterModule {
  static ACCOUNT_REPOSITORY = 'AccountRepository';
  static ACTIVITY_REPOSITORY = 'ActivityRepository';
  static LOAD_ACCOUNT_PORT = 'LoadAccountPort';
  static UPDATE_ACCOUNT_STATE_PORT = 'UpdateAccountStatePort';

  static register(): DynamicModule {
    return {
      module: PersistenceAdapterModule,
      providers: [
        { provide: PersistenceAdapterModule.ACCOUNT_REPOSITORY, useClass: AccountRepositoryImpl },
        { provide: PersistenceAdapterModule.ACTIVITY_REPOSITORY, useClass: ActivityRepositoryImpl },
        AccountMapper,
        AccountPersistenceAdapter,
        { provide: PersistenceAdapterModule.LOAD_ACCOUNT_PORT, useExisting: AccountPersistenceAdapter },
        { provide: PersistenceAdapterModule.UPDATE_ACCOUNT_STATE_PORT, useExisting: AccountPersistenceAdapter },
      ],
      exports: [PersistenceAdapterModule.LOAD_ACCOUNT_PORT, PersistenceAdapterModule.UPDATE_ACCOUNT_STATE_PORT],
    };
  }
}
