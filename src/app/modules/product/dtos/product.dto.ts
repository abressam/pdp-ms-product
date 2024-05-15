import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class ProductDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  en_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  pt_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  en_type: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  pt_type: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  en_desc: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  pt_desc: string;
}
