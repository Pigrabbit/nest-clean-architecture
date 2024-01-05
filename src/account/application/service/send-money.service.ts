import { Money } from 'account/domain';
import dayjs from 'dayjs';
import { SendMoneyUseCase, SendMoneyCommand } from '../port/in';
import { LoadAccountPort, AccountLock, UpdateAccountStatePort } from '../port/out';

export class SendMoneyService implements SendMoneyUseCase {
  private static maximumTransferThreshold = Money.of(1000000);

  constructor(
    private readonly loadAccountPort: LoadAccountPort,
    private readonly accountLock: AccountLock,
    private readonly updateAccountStatePort: UpdateAccountStatePort,
  ) {}

  async sendMoney(command: SendMoneyCommand): Promise<boolean> {
    this.checkThreshold(command);

    const baselineDate = dayjs(new Date()).subtract(10, 'days').toDate();
    const [sourceAccount, targetAccount] = await Promise.all([
      this.loadAccountPort.loadAccount(command.getSourceAccountId(), baselineDate),
      this.loadAccountPort.loadAccount(command.getTargetAccountId(), baselineDate),
    ]);

    this.accountLock.lockAccount(sourceAccount.id);
    if (!sourceAccount.withdraw(command.getMoney(), targetAccount.id)) {
      this.accountLock.releaseAccount(sourceAccount.id);
      return false;
    }

    this.accountLock.lockAccount(targetAccount.id);
    if (!targetAccount.deposit(command.getMoney(), sourceAccount.id)) {
      this.accountLock.releaseAccount(sourceAccount.id);
      this.accountLock.releaseAccount(targetAccount.id);
      return false;
    }

    await Promise.all([
      this.updateAccountStatePort.updateActivities(sourceAccount),
      this.updateAccountStatePort.updateActivities(targetAccount),
    ]);

    this.accountLock.releaseAccount(sourceAccount.id);
    this.accountLock.releaseAccount(targetAccount.id);

    return true;
  }

  private checkThreshold(command: SendMoneyCommand) {
    if (command.getMoney().isGreaterThan(SendMoneyService.maximumTransferThreshold)) {
      throw new Error(
        `Maximum transfer threshold exceeded. maximumThreshold=${
          SendMoneyService.maximumTransferThreshold
        }, tried=${command.getMoney()}`,
      );
    }
  }
}
