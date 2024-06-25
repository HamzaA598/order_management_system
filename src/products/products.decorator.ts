import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

export function createProductSwaggerDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Creates a new product.',
    }),
    ApiBody({ type: CreateProductDto }),
    ApiResponse({
      status: 201,
      description: 'The created product',
      type: Product,
    }),
  );
}

export function removeProductSwaggerDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Removes a product.' }),
    ApiParam({
      name: 'productId',
      description: 'The ID of the product to be removed',
    }),
    ApiResponse({
      status: 200,
      description: 'The deleted product',
      type: Product,
    }),
    ApiResponse({
      status: 404,
      description: 'Product not found',
    }),
  );
}
