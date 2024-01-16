import { AccountId, Money } from '../../domain';
import { GetAccountBalanceQuery } from '../port/in';
import { LoadAccountPort } from '../port/out';

export class GetAccountBalanceService implements GetAccountBalanceQuery {
  constructor(private readonly loadAccountPort: LoadAccountPort) {}

  async getAccountBalance(accountId: AccountId): Promise<Money> {
    return this.loadAccountPort.loadAccount(accountId, new Date()).then((account) => account.calculateBalance());
  }
}
