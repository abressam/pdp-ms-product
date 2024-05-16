import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class GetRatingReqDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
