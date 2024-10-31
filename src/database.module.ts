/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './students/interface/student.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres', 
        host: 'localhost',
        port: 5433, 
        username: 'postgres',
        password: 'ducquan',
        database: 'Scores',
        entities: [StudentEntity],
        synchronize: true, // for development use only, auto-syncs tables
        logging: true,
      }),
      TypeOrmModule.forFeature([StudentEntity]),
    ],
})
export class DatabaseModule {}
