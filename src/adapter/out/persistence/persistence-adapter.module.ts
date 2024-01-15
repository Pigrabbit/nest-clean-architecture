import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmPersistenceModule } from './orm';

@Module({
  imports: [
    TypeOrmModule.forRoot({ type: 'sqlite', database: ':memory:', synchronize: true, autoLoadEntities: true }),
    OrmPersistenceModule,
  ],
  exports: [OrmPersistenceModule],
})
export class PersistenceAdapterModule {}
