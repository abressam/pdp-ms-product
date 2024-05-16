import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject } from 'class-validator';
import { RatingDto } from '@app/modules/rating/dtos/rating.dto';

export class GetAllRatingResDto {
  @ApiProperty()
  @IsNotEmptyObject({ nullable: false })
  rating: RatingDto[];
}
