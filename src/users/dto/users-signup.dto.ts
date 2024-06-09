import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserLoginDto } from './users-login.dto';

export class UserSignupDto extends UserLoginDto{
  @IsNotEmpty({ message: 'First name cannot be empty' })
  @IsString({ message: 'first name but be an alphabet' })
  firstName: string;

  @IsNotEmpty({ message: 'Last name cannot be empty' })
  @IsString({ message: 'Last name but be an alphabet' })
  lastName: string;


  @IsNotEmpty({ message: 'Phone cannot be empty' })
  @MaxLength(11, { message: 'input a valid phone number' })
  phone: string;

}
