import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateContactRequestDto {
  @MaxLength(24)
  @MinLength(4)
  name: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{10}$/, {
    message: 'password is must be a 10 ',
  })
  phonenumber: string;
}
