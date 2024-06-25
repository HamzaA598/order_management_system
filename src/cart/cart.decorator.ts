import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

export function addToCartSwaggerDocs() {
  return applyDecorators(
    ApiOperation({
      summary:
        "Adds a product to the user's cart or updates the quantity if the product is already in the cart.",
    }),
    ApiBody({ type: AddToCartDto }),
    ApiResponse({
      status: 201,
      description: 'The cart after adding the product',
      type: Cart,
    }),
  );
}

export function viewCartSwaggerDocs() {
  return applyDecorators(
    ApiOperation({ summary: "Retrieves the user's cart." }),
    ApiParam({
      name: 'userId',
      description: 'The ID of the user whose cart is being viewed',
    }),
    ApiResponse({
      status: 200,
      description: "The user's cart",
      type: Cart,
    }),
    ApiResponse({
      status: 404,
      description: 'cart is empty',
    }),
  );
}

export function updateCartSwaggerDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Updates the quantity of a product in the cart.' }),
    ApiParam({
      name: 'cartId',
      description: 'The ID of the cart that contains the product to be updated',
    }),
    ApiBody({ type: UpdateCartDto }),
    ApiResponse({
      status: 200,
      description: 'The cart after updating the product',
      type: Cart,
    }),
    ApiResponse({ status: 404, description: 'Cart is empty' }),
  );
}

export function removeFromCartSwaggerDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Removes a product from the cart.' }),
    ApiParam({
      name: 'cartId',
      description: 'The ID of the cart that contains the product to be removed',
    }),
    ApiParam({
      name: 'productId',
      description: 'The ID of the product to be removed from cart',
    }),
    ApiResponse({
      status: 200,
      description: 'The cart after removing the product',
      type: Cart,
    }),
    ApiResponse({
      status: 404,
      description: 'Cart not found/Product is not found inside cart',
    }),
  );
}
