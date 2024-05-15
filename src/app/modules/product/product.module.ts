import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from '@app/modules/product/models/product.model';
import { ProductService } from '@app/modules/product/services/product.service';
import { ProductController } from '@app/modules/product/controllers/product.controller';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
