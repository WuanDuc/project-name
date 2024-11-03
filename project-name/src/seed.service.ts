/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { StudentEntity } from './students/interface/student.entity';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';


@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(StudentEntity)
        private studentRepository: Repository<StudentEntity>,
    ) {}

    async seedDatabaseFromCSV(filePath: string): Promise<void> {
        const entityManager = this.studentRepository.manager;
        const metadata = entityManager.connection.entityMetadatas.find((metadata) => metadata.tableName === 'students');
      console.log('metadata', metadata.tableName);
      if (!metadata) {
        console.log('Table does not exist, creating it...');
        // Table does not exist, create it
        await this.studentRepository.manager.connection.synchronize();
        // Wait for the connection to be initialized before proceeding
        while (!this.studentRepository.manager.connection.isInitialized) {
          await new Promise(resolve => setTimeout(resolve, 100)); // wait for 100ms
        }
      }
      else {
      console.log('Table exists, seeding it...');


      // Comment this for deploy to local 
    let studentCount = 0;
    const limit = 10000; // For deploy to Render duo to connection limit
    // Comment this for deploy to local


        const students: StudentEntity[] = [];
        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', (data) => {


                    // comment this line if seeding to local
                    if (studentCount >= limit) {
                        return;
                    }
                    studentCount++;
                    // comment this line if seeding to local


                    const student = new StudentEntity();
                    student.sbd = parseInt(data.sbd, 10);
                    student.toan = data.toan ? parseFloat(data.toan) : null;
                    student.ngu_van = data.ngu_van ? parseFloat(data.ngu_van) : null;
                    student.ngoai_ngu = data.ngoai_ngu ? parseFloat(data.ngoai_ngu) : null;
                    student.vat_li = data.vat_li ? parseFloat(data.vat_li) : null;
                    student.hoa_hoc = data.hoa_hoc ? parseFloat(data.hoa_hoc) : null;
                    student.sinh_hoc = data.sinh_hoc ? parseFloat(data.sinh_hoc) : null;
                    student.lich_su = data.lich_su ? parseFloat(data.lich_su) : null;
                    student.dia_li = data.dia_li ? parseFloat(data.dia_li) : null;
                    student.gdcd = data.gdcd ? parseFloat(data.gdcd) : null;
                    student.ma_ngoai_ngu = data.ma_ngoai_ngu || null;

                    students.push(student);
                })
                .on('end', async () => {
                    try {
                          // Insert in smaller chunks to avoid stack overflow
                        const batchSize = 100; // Adjust this size as needed
                        for (let i = 0; i < students.length; i += batchSize) {
                            const batch = students.slice(i, i + batchSize);
                            await this.studentRepository.save(batch);
                        }
                        //await this.studentRepository.save(students);
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
}