import { DeleteProductResDto } from '@app/modules/product/dtos/responses/delete-product-res.dto';
import { GetAllProductsResDto } from '@app/modules/product/dtos/responses/get-all-products-res.dto';
import { PutProductReqDto } from '@app/modules/product/dtos/requests/put-product-req.dto';
import { GetProductResDto } from '@app/modules/product//dtos/responses/get-product-res.dto';

export interface ProductServiceInterface {
  getAllProducts(type?: string): Promise<GetAllProductsResDto>;
  getProduct(productId: number): Promise<GetProductResDto>;
  putProduct(
    isAdmin: boolean,
    body: PutProductReqDto,
  ): Promise<GetProductResDto>;
  deleteProduct(
    isAdmin: boolean,
    productId: number,
  ): Promise<DeleteProductResDto>;
}
