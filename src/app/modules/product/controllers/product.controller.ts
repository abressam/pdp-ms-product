import { ProductService } from '@app/modules/product/services/product.service';
import { ProductControllerInterface } from '@app/modules/product/controllers/product.controller.interface';
import { ErrorDto } from '@app/modules/session/dtos/error.dto';
import { DeleteProductResDto } from '@app/modules/product/dtos/responses/delete-product-res.dto';
import { GetProductResDto } from '@app/modules/product/dtos/responses/get-product-res.dto';
import { DeleteProductReqDto } from '@app/modules/product/dtos/requests/delete-product-req.dto';
import { PutProductReqDto } from '@app/modules/product/dtos/requests/put-product-req.dto';
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

@ApiTags('product')
@Controller('product')
export class ProductController implements ProductControllerInterface {
  constructor(private readonly productService: ProductService) {}

  @Get('info')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Get the product data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the product data',
    type: GetProductResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async getProduct(@Request() req: Request) {
    const logger = new Logger(ProductController.name);

    try {
      const isAdmin = req['isAdmin'];
      logger.log('getProduct()');
      return await this.productService.getProduct(isAdmin);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }

  @Put('insert')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Put the product data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the product data',
    type: GetProductResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async putProduct(@Body() body: PutProductReqDto, @Request() req: Request) {
    const logger = new Logger(ProductController.name);

    try {
      const isAdmin = req['isAdmin'];
      logger.log('putProduct()');
      return await this.productService.putProduct(isAdmin, body);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }

  @Delete('remove/:id')
  @HttpCode(200)
  @ApiBearerAuth('auth')
  @ApiOperation({ summary: 'Delete the product data' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JSON with the product status',
    type: DeleteProductResDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDto,
  })
  async deleteProduct(@Param() params: DeleteProductReqDto, @Request() req: Request) {
    const logger = new Logger(ProductController.name);

    try {
      const productId = params.id;
      const isAdmin = req['isAdmin'];
      logger.log('deleteProduct()');
      return await this.productService.deleteProduct(productId, isAdmin);
    } catch (error) {
      logger.error(error);
      throw new HttpException(error.message, error.getStatus());
    }
  }
}
