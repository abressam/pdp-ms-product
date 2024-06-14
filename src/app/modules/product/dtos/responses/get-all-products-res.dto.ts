import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject, IsOptional, IsString } from 'class-validator';
import { ProductDto } from '@app/modules/product/dtos/product.dto';

export class GetAllProductsResDto {
  @ApiProperty()
  @IsNotEmptyObject({ nullable: false })
  product: ProductDto[];

  @IsOptional()
  @IsString()
  type?: string;
}
