import { Entity, PrimaryGeneratedColumn } from 'typeorm';

// https://github.com/typeorm/typeorm/issues/3548
@Entity({ name: 'account' })
export class AccountTypeOrmEntity {
  constructor(id: number) {
    this._id = id;
  }

  @PrimaryGeneratedColumn({ name: 'id' })
  private _id: number;

  get id() {
    return this._id;
  }
}
