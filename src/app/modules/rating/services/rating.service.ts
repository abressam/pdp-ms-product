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

    const ratingDtoArray = rating.map((rating) => ({
      comment: rating.comment,
      grade: rating.grade,
      productId: rating.fk_Product_id,
    }));

    return { rating: ratingDtoArray };
  }

  async getRating(userId: number, productId: number): Promise<GetRatingResDto> {
    const rating = await this.ratingModel.findOne({
      where: {
        fk_Customer_id: userId,
        fk_Product_id: productId,
      },
    });
    this.validateRating(rating);

    return {
      rating: {
        comment: rating.comment,
        grade: rating.grade,
        productId: rating.fk_Product_id,
      },
    };
  }

  async putRating(
    userId: number,
    body: PutRatingReqDto,
  ): Promise<GetRatingResDto> {
    body['fk_Product_id'] = body.productId;
    const ratingOld = await this.ratingModel.findOne({
      where: {
        fk_Customer_id: userId,
        fk_Product_id: body.productId,
      },
    });

    let ratingNew: Rating;

    if (ratingOld) {
      ratingNew = Object.assign({}, ratingOld.dataValues, body);

      await this.ratingModel.update(
        {
          comment: ratingNew.comment,
          grade: ratingNew.grade,
        },
        {
          where: {
            fk_Customer_id: userId,
            fk_Product_id: ratingOld.fk_Product_id,
          },
        },
      );
    } else {
      this.validateInsert(body);

      ratingNew = await this.ratingModel.create({
        comment: body.comment,
        grade: body.grade,
        fk_Customer_id: userId,
        fk_Product_id: body.productId,
      });
    }

    return {
      rating: {
        comment: ratingNew.comment,
        grade: ratingNew.grade,
        productId: ratingNew.fk_Product_id,
      },
    };
  }

  async deleteRating(
    userId: number,
    productId: number,
  ): Promise<DeleteRatingResDto> {
    const rating = await this.ratingModel.findOne({
      where: {
        fk_Customer_id: userId,
        fk_Product_id: productId,
      },
    });

    this.validateRating(rating);

    await rating.destroy();

    return {
      statusCode: 200,
      message: 'Rating successfully deleted',
    };
  }

  private validateInsert(body: PutRatingReqDto) {
    const emptyFields = Object.keys(body).length !== 4;

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
