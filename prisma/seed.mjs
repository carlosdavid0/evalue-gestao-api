import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando processo de seed...');

  // Verificar e criar Planos
  console.log('Verificando planos existentes...');
  const planoBasico = await prisma.plano.upsert({
    where: { id: 'plano-basico' },
    update: {},
    create: {
      id: 'plano-basico',
      nome: 'Plano Básico',
      descricao: 'Ideal para pequenas empresas',
      tokens_mensais: 1000,
      preco: 99.9,
    },
  });
  console.log('Plano Básico verificado/criado');

  const planoPro = await prisma.plano.upsert({
    where: { id: 'plano-pro' },
    update: {},
    create: {
      id: 'plano-pro',
      nome: 'Plano Pro',
      descricao: 'Para empresas em crescimento',
      tokens_mensais: 5000,
      preco: 299.9,
    },
  });
  console.log('Plano Pro verificado/criado');

  // Verificar e criar Empresas
  console.log('Verificando empresas existentes...');
  const empresa1 = await prisma.empresa.upsert({
    where: { cnpj: '12345678901234' },
    update: {},
    create: {
      nome: 'Tech Solutions LTDA',
      cnpj: '12345678901234',
    },
  });
  console.log('Empresa Tech Solutions LTDA verificada/criada');

  const empresa2 = await prisma.empresa.upsert({
    where: { cnpj: '98765432109876' },
    update: {},
    create: {
      nome: 'Marketing Digital SA',
      cnpj: '98765432109876',
    },
  });
  console.log('Empresa Marketing Digital SA verificada/criada');

  console.log('Verificando assinaturas existentes...');
  await prisma.assinatura.upsert({
    where: {
      id: 'assinatura-empresa1',
    },
    update: {},
    create: {
      id: 'assinatura-empresa1',
      empresa_id: empresa1.id,
      plano_id: planoBasico.id,
      tokens_saldo: 1000,
      status: 'ATIVA',
    },
  });
  console.log('Assinatura para Tech Solutions verificada/criada');

  await prisma.assinatura.upsert({
    where: {
      id: 'assinatura-empresa2',
    },
    update: {},
    create: {
      id: 'assinatura-empresa2',
      empresa_id: empresa2.id,
      plano_id: planoPro.id,
      tokens_saldo: 5000,
      status: 'ATIVA',
    },
  });

  console.log('Assinatura para Marketing Digital verificada/criada');
  // Verificar e criar Usuários
  console.log('Verificando usuários existentes...');
  const usuario1 = await prisma.usuario.upsert({
    where: { email: 'joao@techsolutions.com' },
    update: {},
    create: {
      nome: 'João Silva',
      email: 'joao@techsolutions.com',
      role: 'ADMIN',
      empresa_id: empresa1.id,
      password: bcrypt.hashSync(randomUUID(), 10),
    },
  });
  console.log('Usuário João Silva verificado/criado');

  await prisma.usuario.upsert({
    where: { email: 'david@dsolucoes.dev.br' },
    update: {},
    create: {
      nome: 'David',
      email: 'david@dsolucoes.dev.br',
      password: bcrypt.hashSync('Master@123', 10),
      role: 'ADMIN',
      empresa_id: empresa1.id,
    },
  });
  console.log('Usuário David verificado/criado');

  const usuario2 = await prisma.usuario.upsert({
    where: { email: 'maria@marketingdigital.com' },
    update: {},
    create: {
      nome: 'Maria Santos',
      email: 'maria@marketingdigital.com',
      password: bcrypt.hashSync(randomUUID(), 10),
      role: 'USER',
      empresa_id: empresa2.id,
    },
  });
  console.log('Usuário Maria Santos verificado/criado');

  // Verificar e criar Solicitações Criativas
  console.log('Verificando solicitações criativas existentes...');
  await prisma.solicitacaoCreativo.upsert({
    where: {
      id: 'solicitacao-instagram',
    },
    update: {},
    create: {
      id: 'solicitacao-instagram',
      usuario_id: usuario1.id,
      empresa_id: empresa1.id,
      titulo: 'Post para Instagram',
      objetivo: 'Criar post para Instagram',
      link: ['https://www.instagram.com/p/1234567890/'],
      data: new Date(),
      formato: 'FEED',
      tokens_usado: 1,
      status: 'CONCLUIDA',
    },
  });
  console.log('Solicitação criativa para Instagram verificada/criada');

  await prisma.solicitacaoCreativo.upsert({
    where: {
      id: 'solicitacao-story',
    },
    update: {},
    create: {
      id: 'solicitacao-story',
      usuario_id: usuario2.id,
      empresa_id: empresa2.id,
      objetivo: 'Criar story para campanha',
      data: new Date(),
      formato: 'STORY',
      tokens_usado: 1,
      status: 'PROCESSANDO',
    },
  });
  console.log('Solicitação criativa para Story verificada/criada');

  // Verificar e criar Transações de Tokens
  console.log('Verificando transações de tokens existentes...');
  await prisma.transacaoToken.upsert({
    where: {
      id: 'transacao-empresa1',
    },
    update: {},
    create: {
      id: 'transacao-empresa1',
      empresa_id: empresa1.id,
      tipo: 'CREDITO',
      quantidade: 1000,
      saldo_antes: 0,
      saldo_depois: 1000,
      descricao: 'Crédito inicial do plano',
    },
  });
  console.log('Transação de tokens para Tech Solutions verificada/criada');

  await prisma.transacaoToken.upsert({
    where: {
      id: 'transacao-empresa2',
    },
    update: {},
    create: {
      id: 'transacao-empresa2',
      empresa_id: empresa2.id,
      tipo: 'CREDITO',
      quantidade: 5000,
      saldo_antes: 0,
      saldo_depois: 5000,
      descricao: 'Crédito inicial do plano',
    },
  });
  console.log('Transação de tokens para Marketing Digital verificada/criada');

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro durante o processo de seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Conexão com o banco de dados encerrada');
  });
