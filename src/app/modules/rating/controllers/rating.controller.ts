import { RatingService } from '@app/modules/rating/services/rating.service';
import { RatingControllerInterface } from '@app/modules/rating/controllers/rating.controller.interface';
import { ErrorDto } from '@app/modules/session/dtos/error.dto';
import { DeleteRatingResDto } from '@app/modules/rating/dtos/responses/delete-rating-res.dto';
import { GetAllRatingResDto } from '@app/modules/rating/dtos/responses/get-all-rating-res.dto';
import { GetRatingResDto } from '@app/modules/rating/dtos/responses/get-rating-res.dto';
import { GetRatingReqDto } from '@app/modules/rating/dtos/requests/get-rating-req.dto';
import { DeleteRatingReqDto } from '@app/modules/rating/dtos/requests/delete-rating-req.dto';
import { PutRatingReqDto } from '@app/modules/rating/dtos/requests/put-rating-req.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Put,
  Delete,
  Request,
  Body,
  Param,
  HttpCode,
  HttpException,
  Logger,
} from '@nestjs/common';

@ApiTags('rating')
@Controller('rating')
export class RatingController implements RatingControllerInterface {
  constructor(private readonly ratingService: RatingService) {}

  @Get('info')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Get all rating data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with all the rating data',
    type: GetAllRatingResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async getAllRating() {
    const logger = new Logger(RatingController.name);

    try {
      logger.log('getAllRating()');
      return await this.ratingService.getAllRating();
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }

  @Get('info/:id')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Get the rating data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the rating data',
    type: GetRatingResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async getRating(@Param() params: GetRatingReqDto, @Request() req: Request) {
    const logger = new Logger(RatingController.name);

    try {
      const userId = req['userId'];
      const productId = params.id;
      logger.log('getRating()');
      return await this.ratingService.getRating(userId, productId);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }

  @Put('insert')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Put the rating data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the rating data',
    type: GetRatingResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async putRating(@Body() body: PutRatingReqDto, @Request() req: Request) {
    const logger = new Logger(RatingController.name);

    try {
      const userId = req['userId'];
      logger.log('putRating()');
      return await this.ratingService.putRating(userId, body);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }

  @Delete('remove/:id')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Delete the rating data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the rating status',
    type: DeleteRatingResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async deleteProduct(
    @Param() params: DeleteRatingReqDto,
    @Request() req: Request,
  ) {
    const logger = new Logger(RatingController.name);

    try {
      const userId = req['userId'];
      const productId = params.id;
      logger.log('deleteProduct()');
      return await this.ratingService.deleteRating(userId, productId);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }
}
