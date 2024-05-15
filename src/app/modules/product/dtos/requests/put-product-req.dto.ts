import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class PutProductReqDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  brand?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  en_name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  pt_name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  en_type?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  pt_type?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  en_desc?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  pt_desc?: string;
}
