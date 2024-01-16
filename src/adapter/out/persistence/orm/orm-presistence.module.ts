import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoadAccountPort, UpdateAccountStatePort } from 'account/application/port/out';
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
    { provide: LoadAccountPort, useExisting: AccountPersistenceAdapter },
    { provide: UpdateAccountStatePort, useExisting: AccountPersistenceAdapter },
  ],
  exports: [LoadAccountPort, UpdateAccountStatePort],
})
export class OrmPersistenceModule {}
