import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'activity' })
export class ActivityTypeOrmEntity {
  constructor(
    id: number,
    timestamp: Date,
    ownerAccountId: number,
    sourceAccountId: number,
    targetAccountId: number,
    amount: number,
  ) {
    this._id = id;
    this._timestamp = timestamp;
    this._ownerAccountId = ownerAccountId;
    this._sourceAccountId = sourceAccountId;
    this._targetAccountId = targetAccountId;
    this._amount = amount;
  }

  @PrimaryGeneratedColumn({ name: 'id' })
  private _id: number;

  get id() {
    return this._id;
  }

  @Column({ name: 'timestamp' })
  private _timestamp: Date;

  get timestamp() {
    return this._timestamp;
  }

  @Column({ name: 'ownerAccountId' })
  private _ownerAccountId: number;

  get ownerAccountId() {
    return this._ownerAccountId;
  }

  @Column({ name: 'sourceAccountId' })
  private _sourceAccountId: number;

  get sourceAccountId() {
    return this._sourceAccountId;
  }

  @Column({ name: 'targetAccountId' })
  private _targetAccountId: number;

  get targetAccountId() {
    return this._targetAccountId;
  }

  @Column({ name: 'amount' })
  private _amount: number;

  get amount() {
    return this._amount;
  }
}
