import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'activity' })
export class ActivityTypeOrmEntity {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public readonly timestamp: Date;

  @Column({ name: 'owner_account_id' })
  public readonly ownerAccountId: number;

  @Column({ name: 'source_account_id' })
  public readonly sourceAccountId: number;

  @Column({ name: 'target_account_id' })
  public readonly targetAccountId: number;

  @Column()
  public readonly amount: number;
}
