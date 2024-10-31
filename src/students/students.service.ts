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
      async getReportBySubject(subject: string): Promise<any> {
        const result = await this.studentRepository
          .createQueryBuilder('student')
          .select(`
            COUNT(CASE WHEN ${subject} >= 8 THEN 1 END) AS level1,
            COUNT(CASE WHEN ${subject} < 8 AND ${subject} >= 6 THEN 1 END) AS level2,
            COUNT(CASE WHEN ${subject} < 6 AND ${subject} >= 4 THEN 1 END) AS level3,
            COUNT(CASE WHEN ${subject} < 4 THEN 1 END) AS level4
          `)
          .getRawOne();
    
        return {
          good: result.level1, // >= 8 points
          mid: result.level2, // 6 <= points < 8
          bad: result.level3, // 4 <= points < 6
          fail: result.level4, // < 4 points
        };
      }
      async getTop10StudentsInGroupA(): Promise<any[]> {
        return await this.studentRepository
        .createQueryBuilder('student')
        .select('student.sbd')
        .addSelect('student.toan')
        .addSelect('student.vat_li')
        .addSelect('student.hoa_hoc')
        .addSelect(`
            (student.toan + student.vat_li + student.hoa_hoc) / 3 AS avg_scores
        `)
        .where('student.toan IS NOT NULL')
        .andWhere('student.vat_li IS NOT NULL')
        .andWhere('student.hoa_hoc IS NOT NULL')
        .orderBy('avg_scores', 'DESC')
        .limit(10)
        .getRawMany();
    }
}