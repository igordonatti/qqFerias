import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  async sendEmail(to: string, subject: string, text: string) {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>',
      to,
      subject,
      text,
    });

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    console.log(`Email enviado para ${to}. Resultado ${info}`);
  }
}
