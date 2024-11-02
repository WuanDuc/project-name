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
    async getTotalNumberOfStudents(): Promise<number> {
      return await this.studentRepository.count();
  }

  async getScoreDistribution(): Promise<any> {
    const result = await this.studentRepository
        .createQueryBuilder('student')
        .select(`
            COUNT(CASE WHEN (toan IS NOT NULL AND toan <= 1) THEN 1 END) +
            COUNT(CASE WHEN (ngu_van IS NOT NULL AND ngu_van <= 1) THEN 1 END) +
            COUNT(CASE WHEN (ngoai_ngu IS NOT NULL AND ngoai_ngu <= 1) THEN 1 END) +
            COUNT(CASE WHEN (vat_li IS NOT NULL AND vat_li <= 1) THEN 1 END) +
            COUNT(CASE WHEN (hoa_hoc IS NOT NULL AND hoa_hoc <= 1) THEN 1 END) +
            COUNT(CASE WHEN (sinh_hoc IS NOT NULL AND sinh_hoc <= 1) THEN 1 END) +
            COUNT(CASE WHEN (lich_su IS NOT NULL AND lich_su <= 1) THEN 1 END) +
            COUNT(CASE WHEN (dia_li IS NOT NULL AND dia_li <= 1) THEN 1 END) +
            COUNT(CASE WHEN (gdcd IS NOT NULL AND gdcd <= 1) THEN 1 END) AS less_than_1,
            COUNT(CASE WHEN (toan IS NOT NULL AND toan > 1 AND toan <= 2) THEN 1 END) +
            COUNT(CASE WHEN (ngu_van IS NOT NULL AND ngu_van > 1 AND ngu_van <= 2) THEN 1 END) +
            COUNT(CASE WHEN (ngoai_ngu IS NOT NULL AND ngoai_ngu > 1 AND ngoai_ngu <= 2) THEN 1 END) +
            COUNT(CASE WHEN (vat_li IS NOT NULL AND vat_li > 1 AND vat_li <= 2) THEN 1 END) +
            COUNT(CASE WHEN (hoa_hoc IS NOT NULL AND hoa_hoc > 1 AND hoa_hoc <= 2) THEN 1 END) +
            COUNT(CASE WHEN (sinh_hoc IS NOT NULL AND sinh_hoc > 1 AND sinh_hoc <= 2) THEN 1 END) +
            COUNT(CASE WHEN (lich_su IS NOT NULL AND lich_su > 1 AND lich_su <= 2) THEN 1 END) +
            COUNT(CASE WHEN (dia_li IS NOT NULL AND dia_li > 1 AND dia_li <= 2) THEN 1 END) +
            COUNT(CASE WHEN (gdcd IS NOT NULL AND gdcd > 1 AND gdcd <= 2) THEN 1 END) AS less_than_2,
            COUNT(CASE WHEN (toan IS NOT NULL AND toan > 2 AND toan <= 3) THEN 1 END) +
            COUNT(CASE WHEN (ngu_van IS NOT NULL AND ngu_van > 2 AND ngu_van <= 3) THEN 1 END) +
            COUNT(CASE WHEN (ngoai_ngu IS NOT NULL AND ngoai_ngu > 2 AND ngoai_ngu <= 3) THEN 1 END) +
            COUNT(CASE WHEN (vat_li IS NOT NULL AND vat_li > 2 AND vat_li <= 3) THEN 1 END) +
            COUNT(CASE WHEN (hoa_hoc IS NOT NULL AND hoa_hoc > 2 AND hoa_hoc <= 3) THEN 1 END) +
            COUNT(CASE WHEN (sinh_hoc IS NOT NULL AND sinh_hoc > 2 AND sinh_hoc <= 3) THEN 1 END) +
            COUNT(CASE WHEN (lich_su IS NOT NULL AND lich_su > 2 AND lich_su <= 3) THEN 1 END) +
            COUNT(CASE WHEN (dia_li IS NOT NULL AND dia_li > 2 AND dia_li <= 3) THEN 1 END) +
            COUNT(CASE WHEN (gdcd IS NOT NULL AND gdcd > 2 AND gdcd <= 3) THEN 1 END) AS less_than_3,
            COUNT(CASE WHEN (toan IS NOT NULL AND toan > 3 AND toan <= 4) THEN 1 END) +
            COUNT(CASE WHEN (ngu_van IS NOT NULL AND ngu_van > 3 AND ngu_van <= 4) THEN 1 END) +
            COUNT(CASE WHEN (ngoai_ngu IS NOT NULL AND ngoai_ngu > 3 AND ngoai_ngu <= 4) THEN 1 END) +
            COUNT(CASE WHEN (vat_li IS NOT NULL AND vat_li > 3 AND vat_li <= 4) THEN 1 END) +
            COUNT(CASE WHEN (hoa_hoc IS NOT NULL AND hoa_hoc > 3 AND hoa_hoc <= 4) THEN 1 END) +
            COUNT(CASE WHEN (sinh_hoc IS NOT NULL AND sinh_hoc > 3 AND sinh_hoc <= 4) THEN 1 END) +
            COUNT(CASE WHEN (lich_su IS NOT NULL AND lich_su > 3 AND lich_su <= 4) THEN 1 END) +
            COUNT(CASE WHEN (dia_li IS NOT NULL AND dia_li > 3 AND dia_li <= 4) THEN 1 END) +
            COUNT(CASE WHEN (gdcd IS NOT NULL AND gdcd > 3 AND gdcd <= 4) THEN 1 END) AS less_than_4,
            COUNT(CASE WHEN (toan IS NOT NULL AND toan > 4 AND toan <= 5) THEN 1 END) +
            COUNT(CASE WHEN (ngu_van IS NOT NULL AND ngu_van > 4 AND ngu_van <= 5) THEN 1 END) +
            COUNT(CASE WHEN (ngoai_ngu IS NOT NULL AND ngoai_ngu > 4 AND ngoai_ngu <= 5) THEN 1 END) +
            COUNT(CASE WHEN (vat_li IS NOT NULL AND vat_li > 4 AND vat_li <= 5) THEN 1 END) +
            COUNT(CASE WHEN (hoa_hoc IS NOT NULL AND hoa_hoc > 4 AND hoa_hoc <= 5) THEN 1 END) +
            COUNT(CASE WHEN (sinh_hoc IS NOT NULL AND sinh_hoc > 4 AND sinh_hoc <= 5) THEN 1 END) +
            COUNT(CASE WHEN (lich_su IS NOT NULL AND lich_su > 4 AND lich_su <= 5) THEN 1 END) +
            COUNT(CASE WHEN (dia_li IS NOT NULL AND dia_li > 4 AND dia_li <= 5) THEN 1 END) +
            COUNT(CASE WHEN (gdcd IS NOT NULL AND gdcd > 4 AND gdcd <= 5) THEN 1 END) AS less_than_5,
            COUNT(CASE WHEN (toan IS NOT NULL AND toan > 5 AND toan <= 6) THEN 1 END) +
            COUNT(CASE WHEN (ngu_van IS NOT NULL AND ngu_van > 5 AND ngu_van <= 6) THEN 1 END) +
            COUNT(CASE WHEN (ngoai_ngu IS NOT NULL AND ngoai_ngu > 5 AND ngoai_ngu <= 6) THEN 1 END) +
            COUNT(CASE WHEN (vat_li IS NOT NULL AND vat_li > 5 AND vat_li <= 6) THEN 1 END) +
            COUNT(CASE WHEN (hoa_hoc IS NOT NULL AND hoa_hoc > 5 AND hoa_hoc <= 6) THEN 1 END) +
            COUNT(CASE WHEN (sinh_hoc IS NOT NULL AND sinh_hoc > 5 AND sinh_hoc <= 6) THEN 1 END) +
            COUNT(CASE WHEN (lich_su IS NOT NULL AND lich_su > 5 AND lich_su <= 6) THEN 1 END) +
            COUNT(CASE WHEN (dia_li IS NOT NULL AND dia_li > 5 AND dia_li <= 6) THEN 1 END) +
            COUNT(CASE WHEN (gdcd IS NOT NULL AND gdcd > 5 AND gdcd <= 6) THEN 1 END) AS less_than_6,
            COUNT(CASE WHEN (toan IS NOT NULL AND toan > 6 AND toan <= 7) THEN 1 END) +
            COUNT(CASE WHEN (ngu_van IS NOT NULL AND ngu_van > 6 AND ngu_van <= 7) THEN 1 END) +
            COUNT(CASE WHEN (ngoai_ngu IS NOT NULL AND ngoai_ngu > 6 AND ngoai_ngu <= 7) THEN 1 END) +
            COUNT(CASE WHEN (vat_li IS NOT NULL AND vat_li > 6 AND vat_li <= 7) THEN 1 END) +
            COUNT(CASE WHEN (hoa_hoc IS NOT NULL AND hoa_hoc > 6 AND hoa_hoc <= 7) THEN 1 END) +
            COUNT(CASE WHEN (sinh_hoc IS NOT NULL AND sinh_hoc > 6 AND sinh_hoc <= 7) THEN 1 END) +
            COUNT(CASE WHEN (lich_su IS NOT NULL AND lich_su > 6 AND lich_su <= 7) THEN 1 END) +
            COUNT(CASE WHEN (dia_li IS NOT NULL AND dia_li > 6 AND dia_li <= 7) THEN 1 END) +
            COUNT(CASE WHEN (gdcd IS NOT NULL AND gdcd > 6 AND gdcd <= 7) THEN 1 END) AS less_than_7,
            COUNT(CASE WHEN (toan IS NOT NULL AND toan > 7 AND toan <= 8) THEN 1 END) +
            COUNT(CASE WHEN (ngu_van IS NOT NULL AND ngu_van > 7 AND ngu_van <= 8) THEN 1 END) +
            COUNT(CASE WHEN (ngoai_ngu IS NOT NULL AND ngoai_ngu > 7 AND ngoai_ngu <= 8) THEN 1 END) +
            COUNT(CASE WHEN (vat_li IS NOT NULL AND vat_li > 7 AND vat_li <= 8) THEN 1 END) +
            COUNT(CASE WHEN (hoa_hoc IS NOT NULL AND hoa_hoc > 7 AND hoa_hoc <= 8) THEN 1 END) +
            COUNT(CASE WHEN (sinh_hoc IS NOT NULL AND sinh_hoc > 7 AND sinh_hoc <= 8) THEN 1 END) +
            COUNT(CASE WHEN (lich_su IS NOT NULL AND lich_su > 7 AND lich_su <= 8) THEN 1 END) +
            COUNT(CASE WHEN (dia_li IS NOT NULL AND dia_li > 7 AND dia_li <= 8) THEN 1 END) +
            COUNT(CASE WHEN (gdcd IS NOT NULL AND gdcd > 7 AND gdcd <= 8) THEN 1 END) AS less_than_8,
            COUNT(CASE WHEN (toan IS NOT NULL AND toan > 8 AND toan <= 9) THEN 1 END) +
            COUNT(CASE WHEN (ngu_van IS NOT NULL AND ngu_van > 8 AND ngu_van <= 9) THEN 1 END) +
            COUNT(CASE WHEN (ngoai_ngu IS NOT NULL AND ngoai_ngu > 8 AND ngoai_ngu <= 9) THEN 1 END) +
            COUNT(CASE WHEN (vat_li IS NOT NULL AND vat_li > 8 AND vat_li <= 9) THEN 1 END) +
            COUNT(CASE WHEN (hoa_hoc IS NOT NULL AND hoa_hoc > 8 AND hoa_hoc <= 9) THEN 1 END) +
            COUNT(CASE WHEN (sinh_hoc IS NOT NULL AND sinh_hoc > 8 AND sinh_hoc <= 9) THEN 1 END) +
            COUNT(CASE WHEN (lich_su IS NOT NULL AND lich_su > 8 AND lich_su <= 9) THEN 1 END) +
            COUNT(CASE WHEN (dia_li IS NOT NULL AND dia_li > 8 AND dia_li <= 9) THEN 1 END) +
            COUNT(CASE WHEN (gdcd IS NOT NULL AND gdcd > 8 AND gdcd <= 9) THEN 1 END) AS less_than_9,
            COUNT(CASE WHEN (toan IS NOT NULL AND toan > 9 AND toan <= 10) THEN 1 END) +
            COUNT(CASE WHEN (ngu_van IS NOT NULL AND ngu_van > 9 AND ngu_van <= 10) THEN 1 END) +
            COUNT(CASE WHEN (ngoai_ngu IS NOT NULL AND ngoai_ngu > 9 AND ngoai_ngu <= 10) THEN 1 END) +
            COUNT(CASE WHEN (vat_li IS NOT NULL AND vat_li > 9 AND vat_li <= 10) THEN 1 END) +
            COUNT(CASE WHEN (hoa_hoc IS NOT NULL AND hoa_hoc > 9 AND hoa_hoc <= 10) THEN 1 END) +
            COUNT(CASE WHEN (sinh_hoc IS NOT NULL AND sinh_hoc > 9 AND sinh_hoc <= 10) THEN 1 END) +
            COUNT(CASE WHEN (lich_su IS NOT NULL AND lich_su > 9 AND lich_su <= 10) THEN 1 END) +
            COUNT(CASE WHEN (dia_li IS NOT NULL AND dia_li > 9 AND dia_li <= 10) THEN 1 END) +
            COUNT(CASE WHEN (gdcd IS NOT NULL AND gdcd > 9 AND gdcd <= 10) THEN 1 END) AS less_than_10
        `)
        .getRawOne();

    return {
        name: 'Total scores',
        data: [
          Number(result.less_than_1), 
          Number(result.less_than_2),
          Number(result.less_than_3),
          Number(result.less_than_4),
          Number(result.less_than_5),
          Number(result.less_than_6),
          Number(result.less_than_7),
          Number(result.less_than_8),
          Number(result.less_than_9),
          Number(result.less_than_10),
      ],
    };
}
}