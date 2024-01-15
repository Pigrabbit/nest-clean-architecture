import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  LOAD_ACCOUNT_PORT_INJECTION_TOKEN,
  UPDATE_ACCOUNT_STATE_PORT_INJECTION_TOKEN,
} from 'account/application/port/out';
import { AccountPersistenceAdapter } from './account-persistence.adapter';
import { AccountTypeOrmEntity, ActivityTypeOrmEntity } from './entity';
import { AccountMapper } from './mapper';
import { AccountRepository, AccountRepositoryImpl, ActivityRepository, ActivityRepositoryImpl } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([AccountTypeOrmEntity, ActivityTypeOrmEntity])],
  providers: [
    { provide: AccountRepository, useClass: AccountRepositoryImpl },
    { provide: ActivityRepository, useClass: ActivityRepositoryImpl },
    AccountMapper,
    AccountPersistenceAdapter,
    { provide: LOAD_ACCOUNT_PORT_INJECTION_TOKEN, useExisting: AccountPersistenceAdapter },
    { provide: UPDATE_ACCOUNT_STATE_PORT_INJECTION_TOKEN, useExisting: AccountPersistenceAdapter },
  ],
  exports: [LOAD_ACCOUNT_PORT_INJECTION_TOKEN, UPDATE_ACCOUNT_STATE_PORT_INJECTION_TOKEN],
})
export class OrmPersistenceModule {}
