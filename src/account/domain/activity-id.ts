export class ActivityId {
  private _id: number;
  constructor(id: number) {
    this._id = id;
  }

  get id() {
    return this._id;
  }
}
