import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class VerifyCodeDto {
  @IsEmail()
  @ApiProperty({ example: 'mashup.anonymous@gmail.com' })
  email: string;

  @ApiProperty({ example: '1a2b3c' })
  code: string;
}

export class VerifyCodeResponseDto {
  @IsEmail()
  @ApiProperty({ example: 'mashup.anonymous@gmail.com' })
  email: string;

  @ApiPropertyOptional()
  isCodeExpired: boolean;

  @ApiPropertyOptional()
  isVerify: boolean;
}
