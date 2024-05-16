import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class PutRatingReqDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  id?: number;

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
  @IsOptional()
  productId?: number;
}
