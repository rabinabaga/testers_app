import { IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Model } from 'mongoose';
import { IsUnique } from 'src/validators/validators.service';

export class CreateTargetAppDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsUnique('TargetApp', 'link', {
    message: 'App with this link already submitted',
  })
  link: string;

  @IsString()
  @IsNotEmpty()
  icon: string;

  @IsNotEmpty()
  submittedBy: string;
}
