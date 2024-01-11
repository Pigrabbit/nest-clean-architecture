import request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

describe('e2e', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    dataSource = app.get<DataSource>(getDataSourceToken('default'));

    await app.init();
  });

  beforeEach(async () => {
    await Promise.all([
      dataSource.query(`insert into account (id) values (1)`),
      dataSource.query(`insert into account (id) values (2)`),
    ]);
    await Promise.all([
      dataSource.query(`insert into activity (id, timestamp, owner_account_id, source_account_id, target_account_id, amount)
            values (1001, '2018-08-08 08:00:00.0', 1, 1, 2, 500)`),
      dataSource.query(`insert into activity (id, timestamp, owner_account_id, source_account_id, target_account_id, amount)
            values (1002, '2018-08-08 08:00:00.0', 2, 1, 2, 500)`),
      dataSource.query(`insert into activity (id, timestamp, owner_account_id, source_account_id, target_account_id, amount)
            values (1003, '2018-08-09 10:00:00.0', 1, 2, 1, 1000)`),
      dataSource.query(`insert into activity (id, timestamp, owner_account_id, source_account_id, target_account_id, amount)
            values (1004, '2018-08-09 10:00:00.0', 2, 2, 1, 1000)`),
      dataSource.query(`insert into activity (id, timestamp, owner_account_id, source_account_id, target_account_id, amount)
            values (1005, '2019-08-09 10:00:00.0', 1, 1, 2, 1000)`),
      dataSource.query(`insert into activity (id, timestamp, owner_account_id, source_account_id, target_account_id, amount)
            values (1006, '2019-08-09 10:00:00.0', 2, 1, 2, 1000)`),
      dataSource.query(`insert into activity (id, timestamp, owner_account_id, source_account_id, target_account_id, amount)
            values (1007, '2019-08-09 10:00:00.0', 1, 2, 1, 1000)`),
      dataSource.query(`insert into activity (id, timestamp, owner_account_id, source_account_id, target_account_id, amount)
            values (1008, '2019-08-09 10:00:00.0', 2, 2, 1, 1000)`),
    ]);
  });

  afterEach(async () => {
    await Promise.all([dataSource.query(`delete from activity`), dataSource.query(`delete from account`)]);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /accounts/:id/balance', () => {
    it('should get balance', async () => {
      const response = await request(app.getHttpServer()).get('/accounts/1/balance');

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toEqual({ amount: 500 });
    });
  });
});
