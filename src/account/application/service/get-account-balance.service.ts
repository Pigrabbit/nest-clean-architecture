import { AccountId, Money } from '../../domain';
import { GetAccountBalanceQuery } from '../port/in';
import { LoadAccountPort } from '../port/out';

export class GetAccountBalanceService implements GetAccountBalanceQuery {
  private readonly loadAccountPort: LoadAccountPort;

  constructor(loadAccountPort: LoadAccountPort) {
    this.loadAccountPort = loadAccountPort;
  }

  getAccountBalance(accountId: AccountId): Money {
    return this.loadAccountPort.loadAccount(accountId, new Date()).calculateBalance();
  }
}
