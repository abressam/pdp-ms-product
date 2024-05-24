import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsNotEmpty } from 'class-validator';

export class GetProductReqDto {
  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  id: number;
}
