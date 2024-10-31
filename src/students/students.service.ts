/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { StudentEntity } from './interface/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class StudentsService {
    //private readonly stds: Student[] = [];
    constructor(
        @InjectRepository(StudentEntity)
        private studentRepository: Repository<StudentEntity>,
      ) {}
      findStudentById(id: string): Promise<StudentEntity> {
        return this.studentRepository.findOneBy({ sbd: id });
      }

}