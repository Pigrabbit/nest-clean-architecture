import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { SendMoneyController } from './send-money.controller';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { SendMoneyCommand, SendMoneyUseCase, SEND_MONEY_USE_CASE_INJECTION_TOKEN } from 'account/application/port/in';
import { AccountId, Money } from 'account/domain';

describe('SendMoneyController', () => {
  let app: INestApplication;
  let sendMoneyUseCase: SendMoneyUseCase = { sendMoney: jest.fn() };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [SendMoneyController],
      providers: [{ provide: SEND_MONEY_USE_CASE_INJECTION_TOKEN, useValue: sendMoneyUseCase }],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should success', async () => {
    const response = await request(app.getHttpServer()).post('/accounts/send/1/2/500');

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(sendMoneyUseCase.sendMoney).toHaveBeenCalledTimes(1);
    expect(sendMoneyUseCase.sendMoney).toHaveBeenCalledWith(
      new SendMoneyCommand(new AccountId(1), new AccountId(2), Money.of(500)),
    );
  });
});
