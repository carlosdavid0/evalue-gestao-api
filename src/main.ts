import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';

async function bootstrap() {
  const adminApp = await NestFactory.create(AdminModule);

  adminApp.setGlobalPrefix('/api');
  adminApp.enableCors();
  adminApp.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Admin API')
    .setDescription('API for the admin panel')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(adminApp, config);
  SwaggerModule.setup('/swagger', adminApp, document);

  await adminApp.listen(3001);

  const clientApp = await NestFactory.create(ClientModule);
  clientApp.setGlobalPrefix('/api');
  clientApp.enableCors();
  clientApp.useGlobalPipes(new ValidationPipe());

  const clientConfig = new DocumentBuilder()
    .setTitle('Client API')
    .setDescription('API for the client panel')
    .setVersion('1.0')
    .build();

  const clientDocument = SwaggerModule.createDocument(clientApp, clientConfig);
  SwaggerModule.setup('/swagger', clientApp, clientDocument);
  await clientApp.listen(3002);
}
bootstrap();
