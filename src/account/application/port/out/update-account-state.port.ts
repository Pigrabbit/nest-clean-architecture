import { Account } from '../../../domain';

export interface UpdateAccountStatePort {
  updateActivities(account: Account): void;
}
