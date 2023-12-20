import { SendMoneyCommand } from '.';

export interface SendMoneyUseCase {
  sendMoney(command: SendMoneyCommand): boolean;
}
