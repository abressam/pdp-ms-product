import { RatingServiceInterface } from '@app/modules/rating/services/rating.service.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DeleteRatingResDto } from '@app/modules/rating/dtos/responses/delete-rating-res.dto';
import { GetAllRatingResDto } from '@app/modules/rating/dtos/responses/get-all-rating-res.dto';
import { PutRatingReqDto } from '@app/modules/rating/dtos/requests/put-rating-req.dto';
import { GetRatingResDto } from '@app/modules/rating/dtos/responses/get-rating-res.dto';
import { Rating } from '@app/modules/rating/models/rating.model';

@Injectable()
export class RatingService implements RatingServiceInterface {
  constructor(
    @InjectModel(Rating)
    private ratingModel: typeof Rating,
  ) {}

  async getAllRating(): Promise<GetAllRatingResDto> {
    const rating = await this.ratingModel.findAll();
    this.validateRating(rating[0]);

    const ratingDtoArray = rating.map(rating => ({
      id: rating.id,
      comment: rating.comment,
      grade: rating.grade,
      productId: rating.fk_Product_id
    }));

    return { rating: ratingDtoArray };
       
  }

  async getRating(productId: number): Promise<GetRatingResDto> {
    const rating = await this.ratingModel.findByPk(productId)
    this.validateRating(rating)

    return { 
      rating: {
        id: rating.id,
        comment: rating.comment,
        grade: rating.grade,
        productId: rating.fk_Product_id
    } };
  }

  async putRating(
    ratingId: number,
    body: PutRatingReqDto,
  ): Promise<GetRatingResDto> {
    const ratingOld = await this.ratingModel.findByPk(ratingId);

    let ratingNew: Rating;

    if (ratingOld) {

      ratingNew = Object.assign({}, ratingOld.dataValues, body);

      await this.ratingModel.update({
          id: ratingNew.id,
          comment: ratingNew.comment,
          grade: ratingNew.grade,
          productId: ratingNew.fk_Product_id,
        },
        {
          where: {
            id: ratingOld.fk_Product_id,
          },
        },
      );
    } else {
      this.validateInsert(body);

      ratingNew = await this.ratingModel.create({
        id: body.id,
        comment: body.comment,
        grade: body.grade,
        productId: body.productId,
      });
    }

    return { 
      rating: {
        id: ratingNew.id,
        comment: ratingNew.comment,
        grade: ratingNew.grade,
        productId: ratingNew.fk_Product_id,
      },
     };
  }

  async deleteRating(ratingId: number): Promise<DeleteRatingResDto> {
    const rating = await this.ratingModel.findByPk(ratingId);

    this.validateRating(rating);

    await rating.destroy();

    return {
      statusCode: 200,
      message: 'Rating successfully deleted',
    };
  }

  private validateInsert(body: PutRatingReqDto) {
    const emptyFields = Object.keys(body).length !== 9;

    if (emptyFields) {
      throw new HttpException(
        'Cannot insert empty fields',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private validateRating(rating: Rating) {
    if (!rating) {
      throw new HttpException('No rating found', HttpStatus.NOT_FOUND);
    }
  }
}
