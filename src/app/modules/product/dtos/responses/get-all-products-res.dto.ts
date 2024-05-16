import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject } from 'class-validator';
import { ProductDto } from '@app/modules/product/dtos/product.dto';

export class GetAllProductsResDto {
  @ApiProperty()
  @IsNotEmptyObject({ nullable: false })
  product: ProductDto[];
}
