import { Entity, PrimaryGeneratedColumn } from 'typeorm';

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
