import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MaxLength(24)
  @MinLength(8)
  password: string;
}
