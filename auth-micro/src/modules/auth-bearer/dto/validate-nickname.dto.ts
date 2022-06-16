import { ApiProperty } from '@nestjs/swagger';

export class ValidateNicknameDto {
  @ApiProperty({ example: '어나니머쓱' })
  nickname: string;
}

export class ValidateNicknameResponseDto {
  @ApiProperty({ example: '어나니머쓱' })
  nickname: string;

  @ApiProperty({ description: '사용 가능하면 true, 이미 존재하는 닉네임이면 false.', })
  isUnique: boolean;
}
