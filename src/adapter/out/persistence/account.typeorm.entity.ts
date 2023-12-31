import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'account' })
export class AccountTypeOrmEntity {
  constructor(id: string) {
    this._id = id;
  }

  @PrimaryGeneratedColumn({ name: 'id' })
  private _id: string;

  get id() {
    return this._id;
  }
}
