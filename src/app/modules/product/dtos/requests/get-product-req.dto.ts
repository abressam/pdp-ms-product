import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class GetProductReqDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
