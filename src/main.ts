import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: true,
    });
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.setGlobalPrefix('api');
    await app.listen(6000);
    console.log('App listened on port: 6000');
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
