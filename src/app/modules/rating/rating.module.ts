import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rating } from '@app/modules/rating/models/rating.model';
import { RatingService } from '@app/modules/rating/services/rating.service';
import { RatingController } from '@app/modules/rating/controllers/rating.controller';

@Module({
  imports: [SequelizeModule.forFeature([Rating])],
  providers: [RatingService],
  controllers: [RatingController],
})
export class RatingModule {}
