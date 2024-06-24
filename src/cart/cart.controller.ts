import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CartService } from './cart.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { Cart } from './entities/cart.entity';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // TODO: add Dtos and promises for swagger

  @ApiOperation({
    summary:
      "Adds a product to the user's cart or updates the quantity if the product is already in the cart.",
  })
  @ApiBody({ type: AddToCartDto })
  @ApiResponse({
    status: 201,
    description: 'The cart after adding the product',
    type: Cart,
  })
  @Post('add')
  addToCart(@Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(addToCartDto);
  }

  @ApiOperation({ summary: "Retrieves the user's cart." })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user whose cart is being viewed',
  })
  @ApiResponse({
    status: 200,
    description: "The user's cart",
    type: Cart,
  })
  @ApiResponse({
    status: 404,
    description: 'cart is empty',
  })
  @Get(':userId')
  viewCart(@Param('userId') userId: string) {
    return this.cartService.viewCart(+userId);
  }

  // TODO: how to pass the cart id when there is not :id in the endpoint?
  // should i pass userId and productId in the url or in the body?
  @ApiOperation({ summary: 'Updates the quantity of a product in the cart.' })
  @ApiParam({
    name: 'cartId',
    description: 'The ID of the cart that contains the product to be updated',
  })
  @ApiBody({ type: UpdateCartDto })
  @ApiResponse({
    status: 200,
    description: 'The cart after updating the product',
    type: Cart,
  })
  @ApiResponse({ status: 404, description: 'Cart is empty' })
  @Put('update/:cartId')
  updateCart(
    @Param('cartId') cartId: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.updateCart(+cartId, updateCartDto);
  }

  // TODO: how to pass the cart id when there is not :id in the endpoint?
  // should i pass userId and productId in the url or in the body?
  @ApiOperation({ summary: 'Removes a product from the cart.' })
  @ApiParam({
    name: 'cartId',
    description: 'The ID of the cart that contains the product to be removed',
  })
  @ApiParam({
    name: 'productId',
    description: 'The ID of the product to be removed from cart',
  })
  @ApiResponse({
    status: 200,
    description: 'The cart after removing the product',
    type: Cart,
  })
  @ApiResponse({
    status: 404,
    description: 'Cart not found/Product is not found inside cart',
  })
  @Delete('remove/:cartId/:productId')
  removeFromCart(
    @Param('cartId') cartId: string,
    @Param('productId') productId: string,
  ) {
    return this.cartService.removeFromCart(+cartId, +productId);
  }
}
