import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SendMoneyCommand, SendMoneyUseCase } from 'account/application/port/in';
import { AccountId, Money } from 'account/domain';
import request from 'supertest';
import { SendMoneyController } from './send-money.controller';

describe('SendMoneyController', () => {
  let app: INestApplication;
  let sendMoneyUseCase: SendMoneyUseCase = { sendMoney: jest.fn() };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [SendMoneyController],
      providers: [{ provide: SendMoneyUseCase, useValue: sendMoneyUseCase }],
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
