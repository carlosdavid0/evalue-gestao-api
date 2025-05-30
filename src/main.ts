import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';

async function bootstrap() {
  const adminApp = await NestFactory.create(AdminModule);

  adminApp.setGlobalPrefix('/api/admin');
  adminApp.enableCors();
  adminApp.useGlobalPipes(new ValidationPipe());
  await adminApp.listen(3001);

  const clientApp = await NestFactory.create(ClientModule);
  clientApp.setGlobalPrefix('/api/clientes');
  clientApp.enableCors();
  clientApp.useGlobalPipes(new ValidationPipe());
  await clientApp.listen(3002);
}
bootstrap();
