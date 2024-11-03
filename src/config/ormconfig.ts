/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { StudentEntity } from 'src/students/interface/student.entity';
import { DataSourceOptions } from 'typeorm';
import {config} from 'dotenv';
config();
export const dataSourceOptions: DataSourceOptions= 
  {
    type: 'postgres',
    host: process.env.HOSTNAME,
    port: parseInt(process.env.PORT),
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [StudentEntity],
    synchronize: false, // for development use only, auto-syncs tables
    // migrationsRun: true,
    // migrations: ['src/migrations/20230220143000-create-students-table.ts'],
    ssl: {
      rejectUnauthorized: false,
    },
    
  }
