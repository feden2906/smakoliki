import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  @ApiProperty({ example: 'mashup.anonymous@gmail.com' })
  email: string;

  @IsOptional()
  @ApiPropertyOptional()
  allowEmailDuplicate?: boolean;
}

export class SendEmailResponseDto {
  @ApiProperty()
  isSend: boolean;

  @ApiPropertyOptional()
  isUserExist: boolean;
}
