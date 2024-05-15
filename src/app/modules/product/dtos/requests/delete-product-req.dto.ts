import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class DeleteProductReqDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
