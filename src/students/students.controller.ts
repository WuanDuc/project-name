/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentEntity } from './interface/student.entity';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentsService) {}

  // get score by ID
  @Get('scores/:sbd')
  async getStudentScoreBySbd(@Param('sbd') sbd: number): Promise<StudentEntity> {
    console.log(sbd);
    const student = await this.studentService.findStudentBySbd(sbd);
    
    console.log(student);
    return student;
    //return this.studentService.findStudentById(sbd);

  }
  // get top student by subject
  @Get('top10')
  async getTop10StudentsInGroupA(): Promise<any[]> {
    const result = await this.studentService.getTop10StudentsInGroupA();
    return result;
  }
  // get number of student by score and by subject
  @Get('reports/:subject')
  async getReportBySubject(@Param('subject') subject: string): Promise<any> {
    const result = await this.studentService.getReportBySubject(subject);
    return result;
  }
//   @Post('import-csv')
//   async importCSV(@Body('filePath') filePath: string): Promise<string> {
//       await this.studentService.importStudentsFromCSV(filePath);
//       return 'Students imported successfully!';
//   }
  // get total number of student
  @Get('total')
  async getTotalNumberOfStudents(): Promise<any> {
    const result = await this.studentService.getTotalNumberOfStudents();
    return result;
  }
  // get score distribution
  @Get('score-distribution')
  async getScoreDistribution(): Promise<any> {
    const result = await this.studentService.getScoreDistribution();
    return result;
  }
}
