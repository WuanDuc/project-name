/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './students/students.module';
import { DatabaseModule } from './database.module';
@Module({
  imports: [
    DatabaseModule, 
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
