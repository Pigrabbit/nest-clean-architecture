import { DataSource, Repository } from 'typeorm';
import { AccountTypeOrmEntity } from '../entity';
import { ActivityRepository } from './activity.repository';
import { ActivityRepositoryImpl } from '.';
import { ActivityTypeOrmEntity } from '../entity';

describe('ActivityRepositoryImpl', () => {
  let appDataSource: DataSource;
  let activityTypeOrmRepository: Repository<ActivityTypeOrmEntity>;
  let accountTypeOrmRepository: Repository<AccountTypeOrmEntity>;

  beforeAll(async () => {
    appDataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [ActivityTypeOrmEntity, AccountTypeOrmEntity],
    });
    await appDataSource.initialize();
    activityTypeOrmRepository = appDataSource.getRepository(ActivityTypeOrmEntity);
    accountTypeOrmRepository = appDataSource.getRepository(AccountTypeOrmEntity);
  });

  afterEach(async () => {
    await Promise.all([activityTypeOrmRepository.clear(), accountTypeOrmRepository.clear()]);
  });

  afterAll(async () => {
    await appDataSource.destroy();
  });

  describe('findByOwnerSince', () => {
    let account1: AccountTypeOrmEntity;
    let account2: AccountTypeOrmEntity;
    let activityRepository: ActivityRepository;

    beforeEach(async () => {
      [account1, account2] = await accountTypeOrmRepository.save([
        accountTypeOrmRepository.create({ id: 1 }),
        accountTypeOrmRepository.create({ id: 2 }),
      ]);
      await activityTypeOrmRepository.save([
        activityTypeOrmRepository.create({
          timestamp: new Date('2020-01-12'),
          ownerAccountId: account1.id,
          sourceAccountId: account1.id,
          targetAccountId: account2.id,
          amount: 100,
        }),
      ]);
      activityRepository = new ActivityRepositoryImpl(activityTypeOrmRepository);
    });

    it('should find every activity of an account since a given date', async () => {
      // When
      const result = await activityRepository.findByOwnerSince(account1.id, new Date('2020-01-01'));

      // Then
      expect(result).toHaveLength(1);
      expect(result).toEqual(expect.arrayContaining([expect.objectContaining({ id: 1 })]));
    });

    it('should not find any activity of an account before a given date', async () => {
      // When
      const result = await activityRepository.findByOwnerSince(account1.id, new Date('2021-01-01'));

      // Then
      expect(result).toHaveLength(0);
    });
  });

  describe('getDepositBalanceUntil', () => {
    let account1: AccountTypeOrmEntity;
    let account2: AccountTypeOrmEntity;
    let activityRepository: ActivityRepository;

    beforeEach(async () => {
      [account1, account2] = await accountTypeOrmRepository.save([
        accountTypeOrmRepository.create({ id: 1 }),
        accountTypeOrmRepository.create({ id: 2 }),
      ]);
      await activityTypeOrmRepository.save(
        activityTypeOrmRepository.create([
          {
            timestamp: new Date('2020-01-12'),
            ownerAccountId: account1.id,
            sourceAccountId: account1.id,
            targetAccountId: account1.id,
            amount: 100,
          },
          {
            timestamp: new Date('2020-01-22'),
            ownerAccountId: account1.id,
            sourceAccountId: account1.id,
            targetAccountId: account1.id,
            amount: 400,
          },
        ]),
      );
      activityRepository = new ActivityRepositoryImpl(activityTypeOrmRepository);
    });

    it('should return the deposit balance of an account until a given date', async () => {
      // When
      const depositUntil0113 = await activityRepository.getDepositBalanceUntil(account1.id, new Date('2020-01-13'));
      const depositUntil0122 = await activityRepository.getDepositBalanceUntil(account1.id, new Date('2020-01-22'));

      // Then
      expect(depositUntil0113).toBe(100);
      expect(depositUntil0122).toBe(500);
    });

    it('should return null if there is no deposit balance of an account until a given date', async () => {
      // When
      const result = await activityRepository.getDepositBalanceUntil(account1.id, new Date('2020-01-11'));

      // Then
      expect(result).toBeNull();
    });
  });

  describe('getWithdrawalBalanceUntil', () => {
    let account1: AccountTypeOrmEntity;
    let account2: AccountTypeOrmEntity;
    let activityRepository: ActivityRepository;

    beforeEach(async () => {
      [account1, account2] = await accountTypeOrmRepository.save([
        accountTypeOrmRepository.create({ id: 1 }),
        accountTypeOrmRepository.create({ id: 2 }),
      ]);
      await activityTypeOrmRepository.save(
        activityTypeOrmRepository.create([
          {
            timestamp: new Date('2020-01-12'),
            ownerAccountId: account1.id,
            sourceAccountId: account1.id,
            targetAccountId: account2.id,
            amount: 100,
          },
          {
            timestamp: new Date('2020-01-22'),
            ownerAccountId: account1.id,
            sourceAccountId: account1.id,
            targetAccountId: account2.id,
            amount: 400,
          },
        ]),
      );
      activityRepository = new ActivityRepositoryImpl(activityTypeOrmRepository);
    });

    it('should return the withdrawal balance of an account until a given date', async () => {
      // When
      const withdrawalUntil0113 = await activityRepository.getWithdrawalBalanceUntil(
        account1.id,
        new Date('2020-01-13'),
      );
      const withdrawalUntil0122 = await activityRepository.getWithdrawalBalanceUntil(
        account1.id,
        new Date('2020-01-22'),
      );

      // Then
      expect(withdrawalUntil0113).toBe(100);
      expect(withdrawalUntil0122).toBe(500);
    });

    it('should return null if there is no withdrawal balance of an account until a given date', async () => {
      // When
      const result = await activityRepository.getWithdrawalBalanceUntil(account1.id, new Date('2020-01-11'));

      // Then
      expect(result).toBeNull();
    });
  });
});
