/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { StudentController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './interface/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  controllers: [StudentController],
  providers: [StudentsService],
})
export class StudentModule {}