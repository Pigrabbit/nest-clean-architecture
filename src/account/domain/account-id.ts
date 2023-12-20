export class AccountId {
    private _value: string;
  
    constructor(id: string) {
      this._value = id;
    }
  
    get value() {
      return this._value;
    }
  }