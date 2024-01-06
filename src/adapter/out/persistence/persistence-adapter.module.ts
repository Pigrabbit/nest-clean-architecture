import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountMapper } from './account-mapper';
import { AccountPersistenceAdapter } from './account-persistence.adapter';
import { AccountRepositoryImpl } from './account.repository.impl';
import { AccountTypeOrmEntity } from './account.typeorm.entity';
import { ActivityRepositoryImpl } from './activity.repository.impl';
import { ActivityTypeOrmEntity } from './activity.typeorm.entity';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([AccountTypeOrmEntity, ActivityTypeOrmEntity])],
  providers: [
    {
      provide: AccountPersistenceAdapter,
      useFactory: (
        accountRepository: Repository<AccountTypeOrmEntity>,
        activityRepository: Repository<ActivityTypeOrmEntity>,
        accountMapper: AccountMapper,
      ) => {
        return new AccountPersistenceAdapter(
          new AccountRepositoryImpl(accountRepository),
          new ActivityRepositoryImpl(activityRepository),
          accountMapper,
        );
      },
      inject: [getRepositoryToken(AccountTypeOrmEntity), getRepositoryToken(ActivityTypeOrmEntity), AccountMapper],
    },
    AccountMapper,
  ],
  exports: [AccountPersistenceAdapter],
})
export class PersistenceAdapterModule {}
