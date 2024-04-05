import { Injectable } from '@nestjs/common';
import { PrismaService } from '../databases/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByUsername(matricula: string) {
    const user = await this.prisma.funcionario.findUnique({
      where: { matricula },
    });
    return user || null;
  }
}
