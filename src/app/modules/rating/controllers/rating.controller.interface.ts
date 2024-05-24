import { DeleteRatingResDto } from '@app/modules/rating/dtos/responses/delete-rating-res.dto';
import { GetAllRatingResDto } from '@app/modules/rating/dtos/responses/get-all-rating-res.dto';
import { GetRatingResDto } from '@app/modules/rating/dtos/responses/get-rating-res.dto';
import { GetRatingReqDto } from '@app/modules/rating/dtos/requests/get-rating-req.dto';
import { DeleteRatingReqDto } from '@app/modules/rating/dtos/requests/delete-rating-req.dto';
import { PutRatingReqDto } from '@app/modules/rating/dtos/requests/put-rating-req.dto';

export interface RatingControllerInterface {
  getAllRating(): Promise<GetAllRatingResDto>;
  getRating(params: GetRatingReqDto, req: Request): Promise<GetRatingResDto>;
  putRating(body: PutRatingReqDto, req: Request): Promise<GetRatingResDto>;
  deleteProduct(
    params: DeleteRatingReqDto,
    req: Request,
  ): Promise<DeleteRatingResDto>;
}
