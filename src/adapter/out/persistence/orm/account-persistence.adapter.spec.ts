import { Test, TestingModule } from '@nestjs/testing';
import { AccountId, Money } from 'account/domain';
import { DataSource } from 'typeorm';

import { AccountPersistenceAdapter } from './account-persistence.adapter';
import { AccountMapper } from './mapper';
import { AccountTypeOrmEntity, ActivityTypeOrmEntity } from './entity';
import { AccountRepositoryImpl, ActivityRepositoryImpl } from './repository';

describe('AccountPersistenceAdapter', () => {
  let appDataSource: DataSource;
  let module: TestingModule;
  let accountPersistenceAdapter: AccountPersistenceAdapter;

  beforeAll(async () => {
    appDataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [AccountTypeOrmEntity, ActivityTypeOrmEntity],
    });
    await appDataSource.initialize();

    module = await Test.createTestingModule({
      providers: [
        {
          provide: AccountPersistenceAdapter,
          useFactory: (accountMapper: AccountMapper) => {
            return new AccountPersistenceAdapter(
              new AccountRepositoryImpl(appDataSource.getRepository(AccountTypeOrmEntity)),
              new ActivityRepositoryImpl(appDataSource.getRepository(ActivityTypeOrmEntity)),
              accountMapper,
            );
          },
          inject: [AccountMapper],
        },
        AccountMapper,
      ],
    }).compile();
    await module.init();

    accountPersistenceAdapter = module.get<AccountPersistenceAdapter>(AccountPersistenceAdapter);
  });

  beforeEach(async () => {
    await Promise.all([
      appDataSource.query(`insert into account (id) values (1)`),
      appDataSource.query(`insert into account (id) values (2)`),
    ]);
    await Promise.all([
      appDataSource.query(`insert into activity (id, timestamp, owner_account_id, source_account_id, target_account_id, amount)
          values (1001, '2018-08-08 08:00:00.0', 1, 1, 2, 500)`),
      appDataSource.query(`insert into activity (id, timestamp, owner_account_id, source_account_id, target_account_id, amount)
          values (1002, '2018-08-08 08:00:00.0', 2, 1, 2, 500)`),
      appDataSource.query(`insert into activity (id, timestamp, owner_account_id, source_account_id, target_account_id, amount)
          values (1003, '2018-08-09 10:00:00.0', 1, 2, 1, 1000)`),
      appDataSource.query(`insert into activity (id, timestamp, owner_account_id, source_account_id, target_account_id, amount)
          values (1004, '2018-08-09 10:00:00.0', 2, 2, 1, 1000)`),
      appDataSource.query(`insert into activity (id, timestamp, owner_account_id, source_account_id, target_account_id, amount)
          values (1005, '2019-08-09 10:00:00.0', 1, 1, 2, 1000)`),
      appDataSource.query(`insert into activity (id, timestamp, owner_account_id, source_account_id, target_account_id, amount)
          values (1006, '2019-08-09 10:00:00.0', 2, 1, 2, 1000)`),
      appDataSource.query(`insert into activity (id, timestamp, owner_account_id, source_account_id, target_account_id, amount)
          values (1007, '2019-08-09 10:00:00.0', 1, 2, 1, 1000)`),
      appDataSource.query(`insert into activity (id, timestamp, owner_account_id, source_account_id, target_account_id, amount)
          values (1008, '2019-08-09 10:00:00.0', 2, 2, 1, 1000)`),
    ]);
  });

  afterEach(async () => {
    await appDataSource.query(`delete from activity`);
    await appDataSource.query(`delete from account`);
  });

  afterAll(async () => {
    await module.close();
    await appDataSource.destroy();
  });

  describe('loadAccount', () => {
    it('should load account', async () => {
      const account = await accountPersistenceAdapter.loadAccount(new AccountId(1), new Date('2018-08-10 00:00:00.0'));

      expect(account.activityWindow.getActivities()).toHaveLength(2);
      expect(account.calculateBalance()).toEqual(Money.of(500));
    });
  });
});
