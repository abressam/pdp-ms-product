import { DeleteProductResDto } from '@app/modules/product/dtos/responses/delete-product-res.dto';
import { GetProductResDto } from '@app/modules/product/dtos/responses/get-product-res.dto';
import { PutProductReqDto } from '@app/modules/product/dtos/requests/put-product-req.dto';

export interface ProductServiceInterface {
  getProduct(isAdmin: boolean): Promise<GetProductResDto>;
  putProduct(
    isAdmin: boolean,
    body: PutProductReqDto,
  ): Promise<GetProductResDto>;
  deleteProduct(productId: number, isAdmin: boolean): Promise<DeleteProductResDto>;
}
