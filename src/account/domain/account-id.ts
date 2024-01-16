import { IsNotEmpty, IsPositive } from 'class-validator';

export class AccountId {
  @IsPositive()
  @IsNotEmpty()
  private readonly _value: number;

  constructor(id: number) {
    this._value = id;
  }

  get value() {
    return this._value;
  }
}
