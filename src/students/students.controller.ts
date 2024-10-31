/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { Student } from './interface/student.interface';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentsService) {}

  // get score by ID
  @Get('scores/:sbd')
  async getStudentScoreBySbd(@Param('sbd') sbd: string): Promise<Student> {
    return this.studentService.findStudentById(sbd);
  }
  // get top student by subject
}
