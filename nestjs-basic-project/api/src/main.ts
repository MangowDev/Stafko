import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import config from './config';
import * as dotenv from "dotenv";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  dotenv.config({path: ".develop.env"});

  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Stafko API documentation')
    .setDescription('API Documentation for Stafko application.')
    .setVersion('1.0')
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(config.appPort);
}
bootstrap();
