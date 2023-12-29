import { ValidateNested, validateSync } from 'class-validator';
import { Money, AccountId } from '../../../domain';

/**
 * Anti coruuption layer
 */
export class SendMoneyCommand {
  @ValidateNested()
  private readonly sourceAccountId: AccountId;

  @ValidateNested()
  private readonly targetAccountId: AccountId;

  @ValidateNested()
  private readonly money: Money;

  constructor(sourceAccountId: AccountId, targetAccountId: AccountId, money: Money) {
    this.sourceAccountId = sourceAccountId;
    this.targetAccountId = targetAccountId;
    this.money = money;
    this.validateSelf();
  }

  private validateSelf() {
    const errors = validateSync(this);
    if (errors.length > 0) {
      throw new Error(`${SendMoneyCommand.name} Validation failed`);
    }
  }
}
