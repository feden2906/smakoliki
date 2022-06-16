import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
} from 'class-validator';

import { AuthEntityType } from '../types/auth.entity.type';
import { AuthRolesEnum } from '../types/auth-roles.enum';

export class BaseAuthDto implements AuthEntityType {
  @ApiProperty({ example: '99f29076-b481-4ae6-916d-6cbc4c2fc2a9' })
  id: string;

  @ApiProperty({ default: 'firstName', example: 'Alex' })
  @Length(2, 15)
  @IsOptional()
  firstName: string;

  @ApiProperty({ default: 'lastName', example: 'Ander' })
  @Length(2, 15)
  @IsOptional()
  lastName: string;

  @ApiProperty({ example: 'alex@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'user password 5-15 symbols', example: 'QWe123' })
  @IsNotEmpty()
  @Length(5, 15)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;

  @ApiProperty({
    description: 'AuthRolesEnum',
    enum: AuthRolesEnum,
    example: 'USER',
  })
  roles: AuthRolesEnum;

  @ApiProperty({ description: 'boolean', example: false })
  verifiedEmail: boolean;

  @ApiProperty({
    description: 'link',
    example: '.../verify_email/eyJhbGciOiJIUzI1NiIsInR',
  })
  verificationLink: string;

  @ApiProperty({ description: 'picture', example: '' })
  picture: string;

  @ApiProperty({ description: 'token', example: null })
  currentRefreshToken: string;

  @ApiProperty({ description: 'timestamp', example: new Date() })
  createdAt: Date;

  @ApiProperty({ description: 'timestamp', example: new Date() })
  updatedAt: Date;

  @ApiProperty({ description: 'user password 5-15 symbols', example: 'QWe123' })
  @IsNotEmpty()
  @Length(5, 15)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  repeatPassword: string;

  @ApiProperty({
    default: 'accessToken',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbGV4QGdtYWlsLmNvbSIsImlkIjoiNTg3OTMyZjAtYTY5Zi00ZjJmLTgxMGUtYWVmYTdiNDRlNDE0Iiwicm9sZXMiOiJVU0VSIiwiaWF0IjoxNjU1MjA0MTgwLCJleHAiOjE2NTUyMDQ3ODB9.f1A_5-zOyxC-4MXmI_xHgWWujD0qwjj_pSJD8Khc2FU',
  })
  @IsOptional()
  accessToken: string;

  @ApiProperty({
    default: 'refreshToken',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbGV4QGdtYWlsLmNvbSIsImlkIjoiNTg3OTMyZjAtYTY5Zi00ZjJmLTgxMGUtYWVmYTdiNDRlNDE0Iiwicm9sZXMiOiJVU0VSIiwiaWF0IjoxNjU1MjA0MTgwLCJleHAiOjE2NTUyMTMxODB9.O8535e2pXnLkh_Xu8yA7e16ygjTBUJA2cCUmUKBFk1c',
  })
  @IsOptional()
  refreshToken: string;
}
