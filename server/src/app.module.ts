import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './databases/prisma.service';
import { AuthController } from './auth.controller';
import { UserService } from './user/user.service';
import { AuthService } from './services/auth.service';
import { EmailService } from './services/email.service';
import { UsersController } from './email.controller';
import { MessageController } from './message.controller';
import { SolicController } from './solic.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    AuthController,
    UsersController,
    MessageController,
    SolicController,
  ],
  providers: [PrismaService, AuthService, UserService, EmailService],
})
export class AppModule {}
