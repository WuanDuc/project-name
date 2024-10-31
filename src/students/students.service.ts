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
      findStudentBySbd(sbd: number): Promise<StudentEntity> {
        const student = this.studentRepository.findOneBy({ sbd });
        return student;  
        //return this.studentRepository.findOneBy({ sbd: id });
      }

}