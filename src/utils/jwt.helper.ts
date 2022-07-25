import { Injectable } from '@nestjs/common';
import { JwtTokenInterface } from 'src/interfaces/jwt.token.interface';
import * as jwt from 'jsonwebtoken';
import { UserRegister } from 'src/entities/create-user.entity';
import { UserSession } from 'src/entities/user-session.entity';

@Injectable()
export class JwtHelper {
  public async generateToken(tokenDto: JwtTokenInterface): Promise<string> {
    const token = jwt.sign(tokenDto, process.env.JWT_SECRET, {
      expiresIn: '60h',
    });
    return token;
  }

  public async verify(token: string): Promise<false | UserRegister> {
    try {
      jwt.verify(token, process.env.JWT_SECRET || '') as JwtTokenInterface;
      const session = await UserSession.findOne({
        where: { jwttoken: token },
        include: [
          {
            attributes: ['id', 'name', 'email'],
            model: UserRegister,
            required: true,
          },
        ],
        raw: true,
        nest: true,
      });

      if (!session) {
        return false;
      }

      return session.userRegister;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  public getTokenFromHeader(request: Request): string | null {
    let token =
      request.headers['x-access-token'] || request.headers['authorization'];
    if (!token) {
      return null;
    }

    if (Array.isArray(token)) {
      token = token[0];
    }

    if (token && token.startsWith('Bearer ')) {
      // Remove Bearer from string
      return (token = token.slice(7, token.length));
    }
    return token;
  }
}
