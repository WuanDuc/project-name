/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //comment this line if you don't want to seed database
  // const seedService = app.get(SeedService);
  // await seedService.seedDatabaseFromCSV('C:\\Users\\Ideapad gaming 3\\Downloads\\diem_thi_thpt_2024.csv');
  //comment the above line if you don't want to seed database

    // Enable CORS
    app.enableCors({
      origin: 'http://localhost:3001', // replace with your frontend URL
      methods: 'GET,POST,PUT,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Authorization',
    });
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
