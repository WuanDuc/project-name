import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './students/interface/student.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

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