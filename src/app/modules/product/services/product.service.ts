import { ProductServiceInterface } from '@app/modules/product/services/product.service.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DeleteProductResDto } from '@app/modules/product/dtos/responses/delete-product-res.dto';
import { GetAllProductsResDto } from '@app/modules/product/dtos/responses/get-all-products-res.dto';
import { PutProductReqDto } from '@app/modules/product/dtos/requests/put-product-req.dto';
import { Product } from '@app/modules/product/models/product.model';
import { GetProductResDto } from '@app/modules/product/dtos/responses/get-product-res.dto';

@Injectable()
export class ProductService implements ProductServiceInterface {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async getAllProducts(): Promise<GetAllProductsResDto> {
    const products = await this.productModel.findAll();
    this.validateProduct(products[0]);

    return {
      product: products.map((product) => {
        return product;
      }),
    };
  }

  async getProduct(productId: number): Promise<GetProductResDto> {
    const product = await this.productModel.findByPk(productId);
    this.validateProduct(product);

    return { product };
  }

  async putProduct(
    isAdmin: boolean,
    body: PutProductReqDto,
  ): Promise<GetProductResDto> {
    this.validateAuth(isAdmin);

    const productOld = await this.productModel.findByPk(body.id);

    let productNew: Product;

    if (productOld) {
      productNew = Object.assign({}, productOld.dataValues, body);

      await this.productModel.update(
        {
          brand: productNew.brand,
          price: productNew.price,
          quantity: productNew.quantity,
          image: productNew.image,
          en_name: productNew.en_name,
          pt_name: productNew.pt_name,
          en_type: productNew.en_type,
          pt_type: productNew.pt_type,
          en_desc: productNew.en_desc,
          pt_desc: productNew.pt_desc,
        },
        {
          where: {
            id: body.id,
          },
        },
      );
    } else {
      this.validateInsert(body);

      productNew = await this.productModel.create({
        brand: body.brand,
        price: body.price,
        quantity: body.quantity,
        image: body.image,
        en_name: body.en_name,
        pt_name: body.pt_name,
        en_type: body.en_type,
        pt_type: body.pt_type,
        en_desc: body.en_desc,
        pt_desc: body.pt_desc,
      });
    }

    return {
      product: {
        id: productNew.id,
        brand: productNew.brand,
        price: productNew.price,
        quantity: productNew.quantity,
        image: productNew.image,
        en_name: productNew.en_name,
        pt_name: productNew.pt_name,
        en_type: productNew.en_type,
        pt_type: productNew.pt_type,
        en_desc: productNew.en_desc,
        pt_desc: productNew.pt_desc,
      },
    };
  }

  async deleteProduct(
    isAdmin: boolean,
    productId: number,
  ): Promise<DeleteProductResDto> {
    this.validateAuth(isAdmin);

    const product = await this.productModel.findByPk(productId);

    this.validateProduct(product);

    await product.destroy();

    return {
      statusCode: 200,
      message: 'Product successfully deleted',
    };
  }

  private validateInsert(body: PutProductReqDto) {
    const emptyFields = Object.keys(body).length !== 10;

    if (emptyFields) {
      throw new HttpException(
        'Cannot insert empty fields',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private validateProduct(product: Product) {
    if (!product) {
      throw new HttpException('No product found', HttpStatus.NOT_FOUND);
    }
  }

  private validateAuth(isAdmin: boolean) {
    if (!isAdmin) {
      throw new HttpException('Invalid session', HttpStatus.UNAUTHORIZED);
    }
  }
}
