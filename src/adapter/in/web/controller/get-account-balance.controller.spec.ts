import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GetAccountBalanceQuery } from 'account/application/port/in';
import { AccountId } from 'account/domain';
import request from 'supertest';
import { GetAccountBalanceController } from './get-account-balance.controller';

describe('GetAccountBalanceController', () => {
  let app: INestApplication;
  let getAccountBalanceQuery: GetAccountBalanceQuery = { getAccountBalance: jest.fn() };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [GetAccountBalanceController],
      providers: [{ provide: GetAccountBalanceQuery, useValue: getAccountBalanceQuery }],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should success', async () => {
    const response = await request(app.getHttpServer()).get('/accounts/1/balance');

    expect(response.status).toBe(HttpStatus.OK);
    expect(getAccountBalanceQuery.getAccountBalance).toHaveBeenCalledTimes(1);
    expect(getAccountBalanceQuery.getAccountBalance).toHaveBeenCalledWith(new AccountId(1));
  });
});
