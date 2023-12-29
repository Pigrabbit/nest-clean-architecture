import { IsNotEmpty, IsString } from 'class-validator';

export class AccountId {
  @IsString()
  @IsNotEmpty()
  private readonly _value: string;

  constructor(id: string) {
    this._value = id;
  }

  get value() {
    return this._value;
  }
}
