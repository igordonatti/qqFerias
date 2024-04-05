import { Controller, Post, Body } from '@nestjs/common';
import { PrismaService } from './databases/prisma.service';
import { EmailService } from './services/email.service';

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

@Controller('user')
export class UsersController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  @Post('enviarEmail')
  async envioEmail(@Body() data: Data) {
    const gestor = await this.prisma.funcionario.findUnique({
      where: {
        id: data.user.gestorId,
      },
    });

    const welcomeMessage = `${gestor.name}, o colaborador ${data.user.name} abriu uma nova solicitação de férias!`;

    await this.emailService.sendEmail(
      gestor.email,
      'Nova solicitação QQFerias!',
      welcomeMessage,
    );
  }
}
