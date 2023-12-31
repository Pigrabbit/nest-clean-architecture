import { AccountId, Money } from '../../../domain';

export interface GetAccountBalanceQuery {
  getAccountBalance(accountId: AccountId): Promise<Money>;
}
