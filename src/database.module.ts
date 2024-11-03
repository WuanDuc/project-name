/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { StudentEntity } from './students/interface/student.entity';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import ornconfig = require('./config/ormconfig');
// @Module({
//   imports: [
//     ConfigModule.forRoot( {
//       isGlobal: true
//     }),
//     TypeOrmModule.forRoot(ornconfig[0]),
//     // TypeOrmModule.forRootAsync({
//     //   imports: [ConfigModule],
//     //   useFactory: (configService : ConfigService) =>( {
//     //     type: 'postgres', 
//     //     host: configService.get<string>('HOSTNAME') ,
//     //     port: configService.get<number>('PORT'), 
//     //     username: configService.get<string>('USER'),
//     //     password: configService.get<string>('PASSWORD'),
//     //     database: configService.get<string>('DATABASE'),
//     //     entities: [StudentEntity],
//     //     //entities: [join(__dirname, '**', '*.entity.{ts,js}')],
//     //     synchronize: false, // for development use only, auto-syncs tables
//     //     //logging: true,
//     //     ssl:{
//     //       rejectUnauthorized: false
//     //     },
//     //     autoLoadEntities: true,
//     //     migrationsRun: true,
//     //     migrations: ['src/migrations/20230220143000-create-students-table.ts'],
        
//     //   }),
//     //   inject: [ConfigService],
//     //   }),
//       TypeOrmModule.forFeature([StudentEntity]),
//     ],
// })
// export class DatabaseModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './students/interface/student.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import {dataSourceOptions} from './config/ormconfig';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        
        type: 'postgres',
        host: configService.get<string>('HOSTNAME'),
        port: configService.get<number>('PORT'),
        username: configService.get<string>('USER'),
        password: configService.get<string>('PASSWORD'),
        database: configService.get<string>('DATABASE'),
        entities: [StudentEntity],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
        //logging: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
//    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([StudentEntity]),
  ],
})
export class DatabaseModule {
  constructor(private dataSource: DataSource) {}
}