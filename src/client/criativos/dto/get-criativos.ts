import { $Enums, SolicitacaoCreativo } from 'generated/prisma';

export class GetCriativosDto
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
  link: string[];
  titulo: string;
  objetivo: string;
  formato: $Enums.Formato;
  data: Date;
}
