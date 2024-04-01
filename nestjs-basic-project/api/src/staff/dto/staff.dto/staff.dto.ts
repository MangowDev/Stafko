import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class StaffDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  pass: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  user_role?: string;
}
