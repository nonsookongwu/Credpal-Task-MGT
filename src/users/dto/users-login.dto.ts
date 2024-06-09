import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserLoginDto {

  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;


  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(6, { message: 'password must be upto 6 letters' })
  password: string;
}
