import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Put,
  Param,
  HttpStatus,
  HttpException,
  Delete,
} from '@nestjs/common';
import { PrismaService } from './databases/prisma.service';

import { Response } from 'express';
import * as path from 'path';

import { createWriteStream } from 'fs';

import { randomUUID } from 'crypto';
import { createFuncionario } from './dtos/createFuncionario';
import { differenceInYears, parseISO, addMonths } from 'date-fns';

import * as fastcsv from 'fast-csv';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Post('cadastrarFuncionario')
  async postFunc(@Body() body: createFuncionario) {
    const {
      name,
      cpf_cnpj,
      email,
      dataContratacao,
      matricula,
      cargo,
      senha,
      setor,
      gestorBool,
      tipoContrato,
    } = body;

    let gestor: any = [];

    if (!gestorBool) {
      gestor = await this.prisma.funcionario.findMany({
        where: {
          setor: setor,
          gestorBool: true,
        },
      });

      console.log(gestor);
    }

    const funcionario = await this.prisma.funcionario.create({
      data: {
        id: randomUUID(),
        name,
        cpf_cnpj,
        tipoContrato,
        email,
        dataContratacao,
        matricula,
        cargo,
        senha,
        setor,
        gestorBool,
        gestorId: !gestorBool ? gestor[0].id : null,
      },
    });

    return funcionario;
  }

  @Get('funcionarios')
  async getFunc() {
    const funcionarios = await this.prisma.funcionario.findMany();

    return funcionarios;
  }

  @Get('solicitacoesUsuario/:authorId')
  async getSol(@Param('authorId') authorId: string) {
    console.log(authorId);
    const solicitacoes = await this.prisma.solicitacao.findMany({
      include: {
        author: {
          select: {
            setor: true,
            solicitacoes: true,
            name: true,
          },
        },
      },
      where: {
        authorId,
      },
    });

    console.log(solicitacoes);

    return solicitacoes;
  }

  @Get('solicitacoesSetor/:setor')
  async getSolSet(@Param('setor') setor: string) {
    const solicitacoes = await this.prisma.solicitacao.findMany({
      include: {
        author: {
          select: {
            setor: true,
            solicitacoes: true,
            name: true,
          },
        },
      },
      where: {
        aprovada: 0,
        author: {
          setor,
        },
      },
    });
    console.log(solicitacoes);
    return solicitacoes;
  }

  @Post('alterarSolic')
  async postResponse(@Body() body: any) {
    const { idSolic, status } = body;

    //status: 0 = analise, 1 = aprovada, 2 = negada

    const solicitacao = await this.prisma.solicitacao.update({
      where: {
        id: idSolic,
      },
      data: {
        aprovada: status,
      },
    });

    return solicitacao;
  }

  @Post('deletarFuncionario')
  async postDelFunc(@Body() body: any) {
    const { idFuncionario } = body;

    const solicitacoes = await this.prisma.solicitacao.findMany({
      where: { authorId: idFuncionario },
    });

    for (const solicitacao of solicitacoes) {
      await this.prisma.solicitacao.delete({
        where: {
          id: solicitacao.id,
        },
      });
    }

    const result = await this.prisma.funcionario.delete({
      where: {
        id: idFuncionario,
      },
    });

    return result;
  }

  @Post('csvFuncionariosFerias')
  async gerarRelatorioCSVFuncFerias(@Body() body: any, @Res() res: Response) {
    const actualDate = new Date();

    const dados = await this.prisma.funcionario.findMany({
      select: {
        name: true,
        email: true,
        solicitacoes: {
          select: {
            dataInicio: true,
            dataFinal: true,
          },
          where: {
            aprovada: 1,
            AND: [
              { dataInicio: { lte: actualDate } },
              { dataFinal: { gte: actualDate } },
            ],
          },
        },
      },
    });

    console.log(dados);

    const writeStream = createWriteStream('relatorio.csv');

    fastcsv
      .write(dados, { headers: true })
      .pipe(writeStream)
      .on('finish', () => {
        console.log('Relatório CSV gerado com sucesso!');
        // Enviar o arquivo CSV como resposta à solicitação POST
        res.download(
          path.join(__dirname, '..', 'relatorio.csv'),
          'funcionarios_ferias.csv',
        );
      });
  }

  @Post('csvFuncionariosTrabalhando')
  async gerarRelatorioCSVFuncTrabalhando(
    @Body() body: any,
    @Res() res: Response,
  ) {
    const dados = await this.prisma.funcionario.findMany({});

    console.log(dados);

    const writeStream = createWriteStream('relatorio.csv');

    fastcsv
      .write(dados, { headers: true })
      .pipe(writeStream)
      .on('finish', () => {
        console.log('Relatório CSV gerado com sucesso!');
        // Enviar o arquivo CSV como resposta à solicitação POST
        res.download(
          path.join(__dirname, '..', 'relatorio.csv'),
          'funcionarios_ferias.csv',
        );
      });
  }

  @Get('funcionariosTrabalhando/:setor')
  async contFuncionariosTrabalhando(@Param('setor') setor: string) {
    const funcionariosTrabalhando = await this.prisma.funcionario.count({
      where: {
        setor: setor,
        NOT: {
          solicitacoes: {
            some: {
              aprovada: 1,
              dataInicio: { lte: new Date() },
              dataFinal: { gte: new Date() },
            },
          },
        },
      },
    });
    return funcionariosTrabalhando;
  }

  @Put('alterarStatutsSolic')
  async updateSolicitacao(@Body() body: any) {
    const { id, aprovada } = body;

    const solicitacao = await this.prisma.solicitacao.update({
      where: { id },
      data: { aprovada },
    });

    return solicitacao;
  }

  @Get('funcionariosGestores')
  async findGestores() {
    const gestores = await this.prisma.funcionario.findMany({
      where: {
        gestorBool: true,
      },
    });
    console.log(gestores);
    return gestores;
  }

  @Get('funcionariosSetor/:setor')
  async getFuncionariosSetor(@Param('setor') setor: string) {
    const funcionarios = await this.prisma.funcionario.findMany({
      where: {
        setor,
      },
    });

    return funcionarios;
  }

  @Get('funcionariosFerias/:setor')
  async contFuncionariosFerias(@Param('setor') setor: string) {
    const funcionariosFerias = await this.prisma.funcionario.count({
      where: {
        setor: setor,
        solicitacoes: {
          some: {
            aprovada: 1,
            dataInicio: { lte: new Date() },
            dataFinal: { gte: new Date() },
          },
        },
      },
    });
    return funcionariosFerias;
  }

  @Get('feriasProximas/:setor')
  async feriasProximas(@Param('setor') setor: string) {
    const dataAtual = new Date();
    const dataLimite = addMonths(dataAtual, 1);

    const feriasProximas = await this.prisma.solicitacao.findMany({
      where: {
        aprovada: 1,
        dataInicio: {
          lte: dataLimite,
          gte: dataAtual,
        },
        author: {
          setor,
        },
      },
      select: {
        dataFinal: true,
        dataInicio: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    console.log(feriasProximas);
    return feriasProximas;
  }

  @Delete('deletarSolicitacao/:idSolic')
  async deleteSolicitacao(@Param('idSolic') idSolic: string) {
    const solicitacao = await this.prisma.solicitacao.findUnique({
      where: {
        id: idSolic,
      },
    });
    if (solicitacao.aprovada !== 0) {
      await this.prisma.solicitacao.delete({
        where: {
          id: idSolic,
        },
      });
      return 'Solicitação excluída com sucesso.';
    } else {
      return 'Não é possível excluir a solicitação, pois ela não foi aprovada.';
    }
  }
}
