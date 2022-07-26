import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateContactRequestDto {
  @IsNotEmpty()
  @MaxLength(24)
  @MinLength(4)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{10}$/, {
    message: 'password is must be a 10 ',
  })
  phonenumber: string;
}
