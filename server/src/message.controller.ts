import { Post, Controller, Body } from '@nestjs/common';
import { PrismaService } from './databases/prisma.service';

import { spawn } from 'child_process';

interface Data {
  user: {
    id: string;
    name: string;
    cpf_cnpj: string;
    tipoContrato: boolean;
    email: string;
    dataContratacao: string;
    matricula: string;
    cargo: string;
    setor: string;
    gestorBool: boolean;
    gestorId: string;
  };
}

@Controller('message')
export class MessageController {
  constructor(private prisma: PrismaService) {}

  @Post('enviarMensagem')
  async enviarMensagem(@Body() data: Data) {
    const gestorId = data.user.gestorId;
    const gestor = await this.prisma.funcionario.findUnique({
      where: {
        id: gestorId,
      },
    });

    return new Promise((resolve, reject) => {
      const python = spawn('python', [
        '../python/workplace.py',
        gestor.matricula,
        `O funcionário ${data.user.name} solicitou férias`,
      ]);

      let result = '';

      python.stdout.on('data', (data) => {
        result += data.toString();
      });

      python.stderr.on('data', (data) => {
        console.error(data.toString());
        reject(data.toString());
      });

      python.on('close', (code) => {
        if (code !== 0) {
          console.error(`O processo filho saiu com o código ${code}`);
          reject(`O processo filho saiu com o código ${code}`);
        }

        resolve(result);
      });

      python.stdin.write(JSON.stringify(data));
      python.stdin.end();
    });
  }

  @Post('enviarMensagemDoisAnos')
  async enviarMensagemDoisAnos(@Body() data: Data) {
    const gestor = await this.prisma.funcionario.findUnique({
      where: {
        id: data.user.gestorId,
      },
    });

    return new Promise((resolve, reject) => {
      const python = spawn('python', [
        '../python/workplace.py',
        gestor.matricula,
        `O funcionário ${data.user.name} está preste a acumular dois anos sem retirar férias`,
      ]);

      let result = '';

      python.stdout.on('data', (data) => {
        result += data.toString();
      });

      python.stderr.on('data', (data) => {
        console.error(data.toString());
        reject(data.toString());
      });

      python.on('close', (code) => {
        if (code !== 0) {
          console.error(`O processo filho saiu com o código ${code}`);
          reject(`O processo filho saiu com o código ${code}`);
        }

        resolve(result);
      });

      python.stdin.write(JSON.stringify(data));
      python.stdin.end();
    });
  }
}
