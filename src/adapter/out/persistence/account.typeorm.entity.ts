import { Entity, PrimaryGeneratedColumn } from 'typeorm';

// https://github.com/typeorm/typeorm/issues/3548
@Entity({ name: 'account' })
export class AccountTypeOrmEntity {
  @PrimaryGeneratedColumn()
  public readonly id: number;
}
