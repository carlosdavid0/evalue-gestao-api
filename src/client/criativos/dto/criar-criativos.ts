// export class CriarCriativoDto {
//   titulo: string;
//   objetivo: string;
//   link: string;
//   data: Date;
//   formato: string;
// }

import { Formato, SolicitacaoCreativo } from 'generated/prisma';

export class CriarCriativoDto
  implements
    Omit<
      SolicitacaoCreativo,
      | 'id'
      | 'created_at'
      | 'updated_at'
      | 'deleted_at'
      | 'usuario_id'
      | 'empresa_id'
      | 'tokens_usado'
      | 'status'
    >
{
  titulo: string;
  objetivo: string;
  link: string[];
  data: Date;
  formato: Formato;
}
