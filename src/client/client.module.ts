import { Module } from '@nestjs/common';
import { CriativosModule } from './criativos/criativos.module';

@Module({
  imports: [CriativosModule],
})
export class ClientModule {}
