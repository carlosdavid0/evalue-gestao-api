import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CriativosService } from './criativos.service';
import { CriarCriativoDto } from './dto/criar-criativos';

@ApiTags('Criativos')
@Controller('criativos')
export class CriativosController {
  constructor(private readonly criativosService: CriativosService) {}

  @ApiOperation({ summary: 'Buscar todos os criativos' })
  @ApiResponse({
    status: 200,
  })
  @ApiResponse({ status: 404, description: 'Nenhum criativo encontrado' })
  @ApiResponse({ status: 500, description: 'Erro ao buscar os criativos' })
  @Get()
  async findAll() {
    try {
      const criativos = await this.criativosService.findAll();
      return criativos;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @ApiOperation({ summary: 'Buscar criativo por ID' })
  @ApiResponse({ status: 200, description: 'Criativo encontrado' })
  @ApiResponse({ status: 404, description: 'Criativo não encontrado' })
  @ApiResponse({ status: 500, description: 'Erro ao buscar o criativo' })
  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      const criativo = await this.criativosService.findById(id);
      return criativo;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @ApiOperation({ summary: 'Criar um novo criativo' })
  @ApiResponse({ status: 201, description: 'Criativo criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 500, description: 'Erro ao criar o criativo' })
  @Post()
  async create(@Body() criativoDto: CriarCriativoDto) {
    return this.criativosService.create(criativoDto);
  }
}
