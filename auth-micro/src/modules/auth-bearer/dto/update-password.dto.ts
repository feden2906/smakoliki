import { IsString, IsEmail, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  newPassword: string;
}

export class UpdatePasswordResponseDto {
  @IsBoolean()
  @ApiProperty()
  isUpdated: boolean;
}
