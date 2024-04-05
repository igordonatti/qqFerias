import { IsNotEmpty, Length } from 'class-validator';

export class createSol {
  dataInicio: Date;
  dataFinal: Date;
  solDecTerc: number;
  aprovada: number;
  @IsNotEmpty({
    message: 'The name should not be empty.',
  })
  authorId: string;
}
