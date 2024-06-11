import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsNotEmpty } from 'class-validator';

export class DeleteProductReqDto {
  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  id: number;
}
