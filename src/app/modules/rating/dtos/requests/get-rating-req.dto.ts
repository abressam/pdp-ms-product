import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsNotEmpty } from 'class-validator';

export class GetRatingReqDto {
  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  id: number;
}
