import { IsNotEmpty, Length } from 'class-validator';

export class createFuncionario {
  @IsNotEmpty({
    message: 'The member function should not be empty.',
  })
  @Length(3, 100)
  name: string;

  @IsNotEmpty()
  @Length(11, 14)
  cpf_cnpj: string;

  email: string;
  @IsNotEmpty()
  dataContratacao: Date;
  @IsNotEmpty()
  matricula: string;
  @IsNotEmpty()
  cargo: string;
  @IsNotEmpty()
  senha: string;
  @IsNotEmpty()
  setor: string;
  gestorBool: boolean;
  tipoContrato: boolean;
}
