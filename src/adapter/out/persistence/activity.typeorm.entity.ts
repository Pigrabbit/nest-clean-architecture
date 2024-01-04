import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'activity' })
export class ActivityTypeOrmEntity {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public readonly timestamp: Date;

  @Column()
  public readonly ownerAccountId: number;

  @Column()
  public readonly sourceAccountId: number;

  @Column()
  public readonly targetAccountId: number;

  @Column()
  public readonly amount: number;
}
