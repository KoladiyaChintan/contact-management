import { Inject, Injectable } from '@nestjs/common';
import { UserSession } from '../../../entities/user-session.entity';

@Injectable()
export class LogoutService {
  constructor(
    @Inject('USER_SESSION_REPOSITORY')
    private readonly USER_SESSION_REPOSITORY: typeof UserSession,
  ) {}

  async logout(token: string): Promise<[]> {
    await this.USER_SESSION_REPOSITORY.destroy({
      where: { jwttoken: token },
    });
    return [];
  }
}
