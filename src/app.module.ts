import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthcheckModule } from '@app/modules/healthcheck/healthcheck.module';
import { SessionMiddleware } from '@app/modules/session/middlewares/session.middleware';
import { ProductModule } from '@app/modules/product/product.module';
import { ProductController } from '@app/modules/product/controllers/product.controller';
import { RatingController } from '@app/modules/rating/controllers/rating.controller';
import { RatingModule } from '@app/modules/rating/rating.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import appConfig from '@app/configs/app.config';
import dbConfig from '@app/configs/db.config';

@Module({
  imports: [
    HealthcheckModule,
    ProductModule,
    RatingModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    SequelizeModule.forRoot(dbConfig),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(SessionMiddleware)
    .exclude('/product/info', '/product/info/:id')
    .forRoutes(ProductController);
    consumer.apply(SessionMiddleware).forRoutes(RatingController)
  }
}
