import { AccountId, Money } from '../../../../domain';

export abstract class GetAccountBalanceQuery {
  abstract getAccountBalance(accountId: AccountId): Promise<Money>;
}
