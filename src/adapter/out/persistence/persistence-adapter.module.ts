import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  LOAD_ACCOUNT_PORT_INJECTION_TOKEN,
  UPDATE_ACCOUNT_STATE_PORT_INJECTION_TOKEN,
} from 'account/application/port/out';

import { AccountMapper } from './account-mapper';
import { AccountPersistenceAdapter } from './account-persistence.adapter';
import { AccountRepositoryImpl } from './account.repository.impl';
import { AccountTypeOrmEntity } from './account.typeorm.entity';
import { ActivityRepositoryImpl } from './activity.repository.impl';
import { ActivityTypeOrmEntity } from './activity.typeorm.entity';
import { ACCOUNT_REPOSITORY_INJECTION_TOKEN, ACTIVITY_REPOSITORY_INJECTION_TOKEN } from './constant';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([AccountTypeOrmEntity, ActivityTypeOrmEntity])],
  providers: [
    { provide: ACCOUNT_REPOSITORY_INJECTION_TOKEN, useClass: AccountRepositoryImpl },
    { provide: ACTIVITY_REPOSITORY_INJECTION_TOKEN, useClass: ActivityRepositoryImpl },
    AccountMapper,
    AccountPersistenceAdapter,
    { provide: LOAD_ACCOUNT_PORT_INJECTION_TOKEN, useExisting: AccountPersistenceAdapter },
    { provide: UPDATE_ACCOUNT_STATE_PORT_INJECTION_TOKEN, useExisting: AccountPersistenceAdapter },
  ],
  exports: [LOAD_ACCOUNT_PORT_INJECTION_TOKEN, UPDATE_ACCOUNT_STATE_PORT_INJECTION_TOKEN],
})
export class PersistenceAdapterModule {}
