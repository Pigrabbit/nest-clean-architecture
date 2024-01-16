import { SendMoneyCommand } from '../command/send-money.command';

export abstract class SendMoneyUseCase {
  abstract sendMoney(command: SendMoneyCommand): boolean | Promise<boolean>;
}
