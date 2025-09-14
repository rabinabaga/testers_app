import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Model } from 'mongoose';
import { IsUnique } from 'src/validators/validators.service';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUnique('User', 'username', { message: 'Username already exists' })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @IsUnique('User', 'email', { message: 'Email already exists' })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(['TESTER', 'DEVELOPER'])
  @IsNotEmpty()
  role: string;
}
