/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { StudentEntity } from './interface/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
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
    async importStudentsFromCSV(filePath: string): Promise<void> {
        const batchSize = 100; // Adjust based on available memory and performance needs
        const students: StudentEntity[] = [];
    
        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', (data) => {
                    // Map CSV data to StudentEntity
                    const student = new StudentEntity();
                    student.sbd = parseInt(data.sbd, 10);
                    student.toan = data.toan ? parseFloat(data.toan) : null;
                    student.vat_li = data.vat_li ? parseFloat(data.vat_li) : null;
                    student.hoa_hoc = data.hoa_hoc ? parseFloat(data.hoa_hoc) : null;
                    student.ngu_van = data.ngu_van ? parseFloat(data.ngu_van) : null;
                    student.ngoai_ngu = data.ngoai_ngu ? parseFloat(data.ngoai_ngu) : null;
                    student.lich_su = data.lich_su ? parseFloat(data.lich_su) : null;
                    student.dia_li = data.dia_li ? parseFloat(data.dia_li) : null;
                    student.gdcd = data.gdcd ? parseFloat(data.gdcd) : null;
                    student.ma_ngoai_ngu = data.ma_ngoai_ngu || null;
    
                    students.push(student);
    
                    // When batch size is reached, save the batch and reset the array
                    if (students.length >= batchSize) {
                        this.studentRepository.save(students.slice()) // Make a copy for async operations
                            .then(() => students.length = 0) // Clear array after batch insert
                            .catch(reject);
                    }
                })
                .on('end', async () => {
                    try {
                        // Save any remaining students
                        if (students.length > 0) {
                            await this.studentRepository.save(students);
                        }
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
    }
    
}