import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class RatingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  grade: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  productId: number;
}
