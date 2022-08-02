import { Inject, Injectable } from '@nestjs/common';
import { UserVerify } from '../entities/user-verify.entity';
import * as sgMail from '@sendgrid/mail';
import * as random from 'random-token';

export interface IVerifyUserEmail {
  userid: string;
  email: string;
}

@Injectable()
export class SendGridService {
  constructor(
    @Inject('USER_VERIFY_REPOSITORY')
    private readonly USER_VERIFY_REPOSITORY: typeof UserVerify,
  ) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
  }

  async sendVerifyUserMail(userData: IVerifyUserEmail) {
    const random_token = random(16);

    const msg: sgMail.MailDataRequired = {
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || '',
        name: process.env.SENDGRID_FROM_NAME,
      },
      personalizations: [
        {
          to: userData.email,
          dynamicTemplateData: {
            random_token: `${random_token}`,
          },
        },
      ],
      templateId: process.env.SENDGRID_TEMPLATE_ID || '',
    };
    await this.sendMail(msg);

    await this.USER_VERIFY_REPOSITORY.create({
      userid: userData.userid,
      randomtoken: random_token,
    });
  }

  private async sendMail(msg: sgMail.MailDataRequired): Promise<void> {
    try {
      await sgMail.send(msg).then(() => console.log('Mail send'));
    } catch (e) {
      console.log(`sendgrid error`, e);
    }
  }
}
