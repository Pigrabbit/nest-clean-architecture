import { IsNotEmpty, IsString } from 'class-validator';

export class AccountId {
  @IsString()
  @IsNotEmpty()
  private readonly _value: number;

  constructor(id: number) {
    this._value = id;
  }

  get value() {
    return this._value;
  }
}
