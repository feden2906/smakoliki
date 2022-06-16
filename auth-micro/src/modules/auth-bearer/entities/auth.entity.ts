import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AuthEntityType } from '../types/auth.entity.type';
import { AuthRolesEnum } from '../types/auth-roles.enum';

@Entity({ name: 'auth' })
export class AuthEntity implements AuthEntityType {
  @ApiProperty({ example: '99f29076-b481-4ae6-916d-6cbc4c2fc2a9' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'firstName', example: 'Alex' })
  @Column({ nullable: true, type: 'text' })
  firstName: string;

  @ApiProperty({ description: 'lastName', example: 'Ander' })
  @Column({ nullable: true, type: 'text' })
  lastName: string;

  @ApiProperty({ example: 'alex@gmail.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: '$2b$10$LkSb8GYvMQ4sEGKlJM8kOuS..ftMs/PpDOiWSQzJfsT3dLlgFTKIy',
  })
  @Column({ default: null, select: false })
  password: string;

  @ApiProperty({
    description: 'AuthRolesEnum',
    enum: AuthRolesEnum,
    example: 'USER',
  })
  @Column({
    default: AuthRolesEnum.USER,
    enum: AuthRolesEnum,
    type: 'enum',
  })
  roles: AuthRolesEnum;

  @ApiProperty({ description: 'boolean', example: false })
  @Column({ default: false })
  verifiedEmail: boolean;

  @ApiProperty({
    description: 'link',
    example: '.../verify_email/eyJhbGciOiJIUzI1NiIsInR',
  })
  @Column({ nullable: true, unique: true })
  verificationLink: string;

  @ApiProperty({ description: 'picture', example: '' })
  @Column({ default: '' })
  picture: string;

  @ApiProperty({ description: 'token', example: null })
  @Column({ nullable: true })
  @Exclude()
  currentRefreshToken: string;

  @ApiProperty({ description: 'timestamp', example: new Date() })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'timestamp', example: new Date() })
  @UpdateDateColumn()
  updatedAt: Date;
}
