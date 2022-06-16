import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { AuthEntityType } from '../types/auth.entity.type';
import { AuthType } from '../types/auth.type';

export type AuthorizedRequest = Request & { user: AuthType };

export class SignUpDto
  implements
    Pick<AuthEntityType, 'password' | 'firstName' | 'lastName' | 'email'>
{
  @ApiProperty({
    description: 'firstName - can be not unique',
    example: 'Alex',
  })
  @MinLength(2)
  @MaxLength(22)
  @IsOptional()
  firstName: string;

  @ApiProperty({
    description: 'lastName - can be not unique',
    example: 'Ander',
  })
  @MinLength(2)
  @MaxLength(22)
  @IsOptional()
  lastName: string;

  @ApiProperty({ description: 'user password 5-15 symbols', example: 'QWe123' })
  @IsNotEmpty()
  @Length(5, 15)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;

  @ApiProperty({ description: 'user password 5-15 symbols', example: 'QWe123' })
  @IsNotEmpty()
  @Length(5, 15)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  repeatPassword: string;

  @ApiProperty({ description: 'user unique email', example: 'alex@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
