import { ProductServiceInterface } from '@app/modules/product/services/product.service.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DeleteProductResDto } from '@app/modules/product/dtos/responses/delete-product-res.dto';
import { GetProductResDto } from '@app/modules/product/dtos/responses/get-product-res.dto';
import { PutProductReqDto } from '@app/modules/product/dtos/requests/put-product-req.dto';
import { Product } from '@app/modules/product/models/product.model';

@Injectable()
export class ProductService implements ProductServiceInterface {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async getProduct(isAdmin: boolean): Promise<GetProductResDto> {
    const product = await this.productModel.findAll();
    this.validateProduct(product[0]);

    return { product };
  }

  async putProduct(
    isAdmin: boolean,
    body: PutProductReqDto,
  ): Promise<GetProductResDto> {
    const productOld = await this.productModel.findByPk(isAdmin);

    let productNew: Product;
    let addressNew: Address;

    if (productOld) {
      const addressOld = await this.addressModel.findByPk(
        productOld.fk_Address_id,
      );

      productNew = Object.assign({}, productOld.dataValues, body);
      addressNew = Object.assign({}, addressOld.dataValues, body);

      await this.productModel.update(
        {
          cpf: productNew.cpf,
          phone: productNew.phone,
        },
        {
          where: {
            id: isAdmin,
          },
        },
      );

      await this.addressModel.update(
        {
          zipcode: addressNew.zipcode,
          city: addressNew.city,
          complement: addressNew.complement,
          street: addressNew.street,
          number: addressNew.number,
          neighbourhood: addressNew.neighbourhood,
          state: addressNew.state,
        },
        {
          where: {
            id: productOld.fk_Address_id,
          },
        },
      );
    } else {
      this.validateInsert(body);

      addressNew = await this.addressModel.create({
        zipcode: body.zipcode,
        city: body.city,
        complement: body.complement,
        street: body.street,
        number: body.number,
        neighbourhood: body.neighbourhood,
        state: body.state,
      });

      productNew = await this.productModel.create({
        id: isAdmin,
        cpf: body.cpf,
        phone: body.phone,
        fk_Address_id: addressNew.id,
      });
    }

    return {
      product: {
        cpf: productNew.cpf,
        phone: productNew.phone,
        zipcode: addressNew.zipcode,
        city: addressNew.city,
        complement: addressNew.complement,
        street: addressNew.street,
        number: addressNew.number,
        neighbourhood: addressNew.neighbourhood,
        state: addressNew.state,
      },
    };
  }

  async deleteProduct(productId: number, isAdmin: boolean): Promise<DeleteProductResDto> {
    const product = await this.productModel.findByPk(productId);

    this.validateProduct(product);

    await product.destroy();

    return {
      statusCode: 200,
      message: 'Product successfully deleted',
    };
  }

  private validateInsert(body: PutProductReqDto) {
    const emptyFields = Object.keys(body).length !== 9;

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
}
