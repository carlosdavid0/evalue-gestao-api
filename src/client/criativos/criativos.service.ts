import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CriarCriativoDto } from './dto/criar-criativos';

@Injectable()
export class CriativosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.solicitacaoCreativo.findMany();
  }

  async findById(id: string) {
    return await this.prisma.solicitacaoCreativo.findUnique({
      where: { id },
    });
  }

  async create(criativoDto: CriarCriativoDto) {
    return await this.prisma.solicitacaoCreativo.create({
      data: {
        data: criativoDto.data,
        formato: criativoDto.formato,
        link: criativoDto.link,
        objetivo: criativoDto.objetivo,
        titulo: criativoDto.titulo,
        created_at: new Date(),
        usuario: {
          connect: {
            id: '1',
          },
        },
        empresa: {
          connect: {
            id: '1',
          },
        },
      },
    });
  }
}
