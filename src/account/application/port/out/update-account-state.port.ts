import { Account } from '../../../domain';

export interface UpdateAccountStatePort {
  updateAQctivities(account: Account): void;
}
