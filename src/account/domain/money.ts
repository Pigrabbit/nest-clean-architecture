export class Money {
  private amount: number;

  constructor(money: number = 0) {
    this.amount = money;
  }

  static add(a: Money, b: Money): Money {
    return new Money(a.amount + b.amount);
  }

  isPositive(): boolean {
    return this.amount > 0;
  }

  negate(): Money {
    return new Money(this.amount * -1);
  }
}
