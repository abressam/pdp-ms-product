import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class DeleteRatingReqDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
