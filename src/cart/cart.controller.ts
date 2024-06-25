import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';
import {
  addToCartSwaggerDocs,
  removeFromCartSwaggerDocs,
  updateCartSwaggerDocs,
  viewCartSwaggerDocs,
} from './cart.decorator';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // TODO: add Dtos and promises for swagger

  @addToCartSwaggerDocs()
  @Post('add')
  addToCart(@Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(addToCartDto);
  }

  @viewCartSwaggerDocs()
  @Get(':userId')
  viewCart(@Param('userId') userId: string) {
    return this.cartService.viewCart(+userId);
  }

  // TODO: how to pass the cart id when there is not :id in the endpoint?
  // should i pass userId and productId in the url or in the body?
  @updateCartSwaggerDocs()
  @Put('update/:cartId')
  updateCart(
    @Param('cartId') cartId: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.updateCart(+cartId, updateCartDto);
  }

  // TODO: how to pass the cart id when there is not :id in the endpoint?
  // should i pass userId and productId in the url or in the body?

  @removeFromCartSwaggerDocs()
  @Delete('remove/:cartId/:productId')
  removeFromCart(
    @Param('cartId') cartId: string,
    @Param('productId') productId: string,
  ) {
    return this.cartService.removeFromCart(+cartId, +productId);
  }
}
