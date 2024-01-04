import { AccountId } from 'account/domain';
import { DataSource, Repository } from 'typeorm';
import { AccountRepositoryImpl } from './account.repository.impl';
import { AccountTypeOrmEntity } from './account.typeorm.entity';

describe('AccountRepositoryImpl', () => {
  let appDataSource: DataSource;
  let accountTypeOrmRepository: Repository<AccountTypeOrmEntity>;

  beforeAll(async () => {
    appDataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      entities: [AccountTypeOrmEntity],
    });
    await appDataSource.initialize();
    accountTypeOrmRepository = appDataSource.getRepository(AccountTypeOrmEntity);
  });

  afterEach(async () => {
    await accountTypeOrmRepository.clear();
  });

  afterAll(async () => {
    await appDataSource.destroy();
  });

  describe('findById', () => {
    it('should return an account', async () => {
      // Given
      await accountTypeOrmRepository.save(accountTypeOrmRepository.create());
      const accountRepository = new AccountRepositoryImpl(accountTypeOrmRepository);

      // When
      const result = await accountRepository.findById(new AccountId(1));

      // Then
      expect(result).not.toBeNull();
      expect(result.id).toBe(1);
    });

    it('should throw an error if account does not exist', async () => {
      // Given
      const accountRepository = new AccountRepositoryImpl(accountTypeOrmRepository);

      // When & Then
      expect(accountRepository.findById(new AccountId(1))).rejects.toThrow(/^Account not found./);
    });
  });
});
