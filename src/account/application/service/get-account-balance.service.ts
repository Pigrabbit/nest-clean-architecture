import { Inject } from '@nestjs/common';
import { AccountId, Money } from '../../domain';
import { GetAccountBalanceQuery } from '../port/in';
import { LoadAccountPort } from '../port/out';

export class GetAccountBalanceService implements GetAccountBalanceQuery {
  constructor(@Inject('LoadAccountPort') private readonly loadAccountPort: LoadAccountPort) {}

  async getAccountBalance(accountId: AccountId): Promise<Money> {
    return (await this.loadAccountPort.loadAccount(accountId, new Date())).calculateBalance();
  }
}
