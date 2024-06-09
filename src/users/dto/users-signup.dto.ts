import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserSignupDto {
  @IsNotEmpty({ message: 'First name cannot be empty' })
  @IsString({ message: 'first name but be an alphabet' })
  firstName: string;

  @IsNotEmpty({ message: 'Last name cannot be empty' })
  @IsString({ message: 'Last name but be an alphabet' })
  lastName: string;

  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Phone cannot be empty' })
  @MaxLength(11, { message: 'input a valid phone number' })
  phone: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(6, { message: 'password must be upto 6 letters' })
  password: string;
}
