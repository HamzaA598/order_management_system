import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  createProductSwaggerDocs,
  removeProductSwaggerDocs,
} from './products.decorator';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @createProductSwaggerDocs()
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @removeProductSwaggerDocs()
  @Delete(':productId')
  remove(@Param('productId') productId: string) {
    return this.productsService.remove(+productId);
  }
}
