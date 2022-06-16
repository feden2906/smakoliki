import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ example: 'mashup.anonymous@gmail.com' })
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}

export class LoginResponseDto {
  @ApiProperty()
  accessToken: string;
}
