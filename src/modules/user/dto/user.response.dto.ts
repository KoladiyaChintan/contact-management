import { UserRegister } from 'src/entities/create-user.entity';

export class UserRegisterResponseDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;

  constructor(userRegister: UserRegister) {
    this.id = userRegister.id;
    this.name = userRegister.name;
    this.email = userRegister.email;
    this.password = userRegister.password;
  }
}
