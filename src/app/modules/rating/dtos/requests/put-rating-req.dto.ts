import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class PutRatingReqDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  grade?: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  productId: number;
}
