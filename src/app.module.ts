/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './students/students.module';
import { DatabaseModule } from './database.module';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './students/interface/student.entity';
@Module({
  imports: [
    DatabaseModule, 
    StudentModule,
    TypeOrmModule.forFeature([StudentEntity]),
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}
