import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  @ApiProperty()
  email: string;
}

export class ResetPasswordResponseDto {
  @IsBoolean()
  @ApiProperty()
  hasSent: boolean;
}
