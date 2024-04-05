import {
  Controller,
  Get,
  Param,
  HttpException,
  Post,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from './databases/prisma.service';
import { differenceInDays, differenceInYears, parseISO } from 'date-fns';
import { createSol } from './dtos/createSol';
import { randomUUID } from 'crypto';

@Controller('solic')
export class SolicController {
  constructor(private prisma: PrismaService) {}

  @Get('diasDisponiveis/:idUsuario')
  async getDiasDisponiveis(@Param('idUsuario') idUsuario: string) {
    const solicitacoes = await this.prisma.solicitacao.findMany({
      where: {
        aprovada: {
          not: 2,
        },
        authorId: idUsuario,
      },
      select: {
        dataInicio: true,
        dataFinal: true,
      },
    });

    let diasFerias = 30;
    let hasFifiteenDays = false;
    let fiveDays = 0;
    for (const s of solicitacoes) {
      const dias = differenceInDays(s.dataFinal, s.dataInicio);
      if (dias >= 15) {
        hasFifiteenDays = true;
      }

      if (dias >= 5) {
        fiveDays += 1;
      }
      diasFerias -= dias;
    }

    return { diasFerias, hasFifiteenDays, fiveDays };
  }

  @Get('infoDoisAnos/:idUsuario')
  async info2anos(@Param('idUsuario') idUsuario: string) {
    let hasSoli = false;
    const dataContratacao = await this.getDataContratacao(idUsuario);

    const diferencaAnos = differenceInYears(
      parseISO(new Date().getFullYear().toString()),
      dataContratacao,
    );

    if (diferencaAnos < 1) {
      hasSoli = true;

      return { hasSoli };
    }

    const solicitacoes = await this.prisma.solicitacao.findMany({
      where: {
        aprovada: {
          not: 2,
        },
        authorId: idUsuario,
        createAt: {
          gte: new Date(`${new Date().getFullYear() - 1}-01-01T00:00:00.000Z`),
          lt: new Date(`${new Date().getFullYear() + 1}-01-01T00:00:00.000Z`),
        },
      },
    });

    if (solicitacoes.length > 0) {
      hasSoli = true;
    }

    return { hasSoli };
  }

  @Post('/cadastrarSolicitacao')
  async postSol(@Body() body: createSol) {
    const { dataInicio, dataFinal, solDecTerc, aprovada, authorId } = body;

    const dataContratacao = await this.getDataContratacao(authorId);
    const { diasFerias, hasFifiteenDays } = await this.getDiasDisponiveis(
      authorId,
    );

    console.log(diasFerias);

    const diferencaAnos = differenceInYears(
      parseISO(dataInicio.toString()),
      dataContratacao,
    );

    if (diferencaAnos < 1) {
      throw new HttpException(
        'Na data colocada você ainda não possui 1 ano de empresa!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const diasSolicitados = differenceInDays(
      parseISO(dataFinal.toString()),
      parseISO(dataInicio.toString()),
    );

    if (diasSolicitados > diasFerias) {
      throw new HttpException(
        'A quantidade de dias solicitados é maior do que a quantidade de dias disponíveis',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!hasFifiteenDays && diasSolicitados > diasFerias) {
      throw new HttpException(
        'Você precisa tirar pelo menos um período contendo 15 dias de férias',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!hasFifiteenDays && diasFerias === 15) {
      throw new HttpException(
        'Você precisa tirar um período de 15 dias de férias',
        HttpStatus.BAD_REQUEST,
      );
    }

    const solicitacao = await this.prisma.solicitacao.create({
      data: {
        id: randomUUID(),
        dataInicio,
        dataFinal,
        solDecTerc,
        aprovada,
        authorId,
      },
    });

    return solicitacao;
  }

  @Get('/funcionario/:id/contratacao')
  async getDataContratacao(@Param('id') id: string) {
    const funcionario = await this.prisma.funcionario.findUnique({
      where: { id },
    });
    if (!funcionario) {
      throw new HttpException(
        'Funcionário não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }
    return funcionario.dataContratacao;
  }

  @Get('ultimaSolicitacao/:idUsuario')
  async ultimaSolicitacao(@Param('idUsuario') idUsuario: string) {
    const solicitacao = await this.prisma.solicitacao.findFirst({
      where: {
        authorId: idUsuario,
        aprovada: 1,
      },
      orderBy: {
        dataFinal: 'desc',
      },
    });

    if (!solicitacao) {
      throw new HttpException(
        'O usuário ainda não possui solicitações aprovadas!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const dataAtual = new Date();
    const dataSolicitacao = new Date(solicitacao.dataFinal);
    const diferencaAnos = differenceInYears(dataAtual, dataSolicitacao);

    return {
      maisDeUmAno: diferencaAnos >= 1,
    };
  }
}
