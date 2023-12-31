import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'activity' })
export class ActivityTypeOrmEntity {
  constructor(
    id: string,
    timestamp: Date,
    ownerAccountId: string,
    sourceAccountId: string,
    targetAccountId: string,
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
  private _id: string;

  get id() {
    return this._id;
  }

  @Column({ name: 'timestamp' })
  private _timestamp: Date;

  get timestamp() {
    return this._timestamp;
  }

  @Column({ name: 'ownerAccountId' })
  private _ownerAccountId: string;

  get ownerAccountId() {
    return this._ownerAccountId;
  }

  @Column({ name: 'sourceAccountId' })
  private _sourceAccountId: string;

  get sourceAccountId() {
    return this._sourceAccountId;
  }

  @Column({ name: 'targetAccountId' })
  private _targetAccountId: string;

  get targetAccountId() {
    return this._targetAccountId;
  }

  @Column({ name: 'amount' })
  private _amount: number;

  get amount() {
    return this._amount;
  }
}
