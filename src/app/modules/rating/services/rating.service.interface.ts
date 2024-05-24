import { DeleteRatingResDto } from '@app/modules/rating/dtos/responses/delete-rating-res.dto';
import { GetAllRatingResDto } from '@app/modules/rating/dtos/responses/get-all-rating-res.dto';
import { PutRatingReqDto } from '@app/modules/rating/dtos/requests/put-rating-req.dto';
import { GetRatingResDto } from '@app/modules/rating//dtos/responses/get-rating-res.dto';

export interface RatingServiceInterface {
  getAllRating(): Promise<GetAllRatingResDto>;
  getRating(userId: number, productId: number): Promise<GetRatingResDto>;
  putRating(userId: number, body: PutRatingReqDto): Promise<GetRatingResDto>;
  deleteRating(userId: number, productId: number): Promise<DeleteRatingResDto>;
}
