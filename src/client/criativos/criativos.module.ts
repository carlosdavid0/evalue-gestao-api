import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { CriativosController } from './criativos.controller';
import { CriativosService } from './criativos.service';

@Module({
  imports: [PrismaModule],
  controllers: [CriativosController],
  providers: [CriativosService],
})
export class CriativosModule {}
