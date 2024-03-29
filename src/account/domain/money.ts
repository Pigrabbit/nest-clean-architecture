import { IsNotEmpty, IsPositive } from 'class-validator';

export class Money {
  @IsPositive()
  @IsNotEmpty()
  private readonly amount: number;

  constructor(money: number = 0) {
    this.amount = money;
  }

  static add(a: Money, b: Money): Money {
    return new Money(a.amount + b.amount);
  }

  static subtract(a: Money, b: Money): Money {
    return new Money(a.amount - b.amount);
  }

  static of(amount: number): Money {
    return new Money(amount);
  }

  getAmount(): number {
    return this.amount;
  }

  isPositive(): boolean {
    return this.amount > 0;
  }

  negate(): Money {
    return new Money(this.amount * -1);
  }

  isGreaterThan(other: Money): boolean {
    return this.amount > other.amount;
  }
}
