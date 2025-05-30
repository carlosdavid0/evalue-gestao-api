import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CriativosService } from './criativos.service';

@ApiTags('Criativos')
@Controller('criativos')
export class CriativosController {
  constructor(private readonly criativosService: CriativosService) {}
}
