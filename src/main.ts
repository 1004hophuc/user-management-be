import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { createDocument } from './swagger/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: true,
    });
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.setGlobalPrefix('api/v1');
    SwaggerModule.setup('api', app, createDocument(app));
    await app.listen(3002);
    console.log('App listened on port: 3002');
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
