import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
  })
  password: string;
}
