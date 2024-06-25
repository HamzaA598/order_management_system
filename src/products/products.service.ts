import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { name, description, price, stock } = createProductDto;

    const newProduct = await this.prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
      },
    });

    return newProduct;
  }

  async remove(productId: number) {
    const product = await this.prisma.product.findUnique({
      where: { productId: productId },
    });

    if (!product)
      throw new NotFoundException(`Product ${productId} is not found`);

    return await this.prisma.product.delete({
      where: { productId: productId },
    });
  }
}
