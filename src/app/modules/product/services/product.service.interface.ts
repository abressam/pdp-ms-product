import { DeleteProductResDto } from '@app/modules/product/dtos/responses/delete-product-res.dto';
import { GetAllProductsResDto } from '@app/modules/product/dtos/responses/get-all-products-res.dto';
import { PutProductReqDto } from '@app/modules/product/dtos/requests/put-product-req.dto';
import { GetProductResDto } from '@app/modules/product//dtos/responses/get-product-res.dto';

export interface ProductServiceInterface {
  getAllProducts(isAdmin: boolean): Promise<GetAllProductsResDto>;
  getProduct(productId: number): Promise<GetProductResDto>;
  putProduct(
    isAdmin: boolean,
    productId: number,
    body: PutProductReqDto,
  ): Promise<GetProductResDto>;
  deleteProduct(productId: number, isAdmin: boolean): Promise<DeleteProductResDto>;
}
