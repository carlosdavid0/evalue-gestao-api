import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CriativosModule } from './criativos/criativos.module';

@Module({
  imports: [CriativosModule, AuthModule, PrismaModule],
})
export class ClientModule {}
