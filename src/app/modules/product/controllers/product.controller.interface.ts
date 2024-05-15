import { DeleteProductResDto } from '@app/modules/product/dtos/responses/delete-product-res.dto';
import { GetProductResDto } from '@app/modules/product/dtos/responses/get-product-res.dto';
import { DeleteProductReqDto } from '@app/modules/product/dtos/requests/delete-product-req.dto';
import { PutProductReqDto } from '@app/modules/product/dtos/requests/put-product-req.dto';

export interface ProductControllerInterface {
  getProduct(req: Request): Promise<GetProductResDto>;
  putProduct(
    body: PutProductReqDto,
    req: Request,
  ): Promise<GetProductResDto>;
  deleteProduct(
    params: DeleteProductReqDto,
    req: Request
  ): Promise<DeleteProductResDto>;
}
