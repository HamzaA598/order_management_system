import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addToCart(@Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(addToCartDto);
  }

  @Get(':cartId')
  viewCart(@Param('cartId') cartId: string) {
    return this.cartService.viewCart(+cartId);
  }

  // TODO: how to pass the cart id when there is not :id in the endpoint?
  // should i pass userId and productId in the url or in the body?
  @Put('update/:cartId')
  updateCart(
    @Param('cartId') cartId: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.updateCart(+cartId, updateCartDto);
  }

  // TODO: how to pass the cart id when there is not :id in the endpoint?
  // should i pass userId and productId in the url or in the body?
  @Delete('remove/:cartId/:productId')
  removeFromCart(
    @Param('cartId') cartId: string,
    @Param('productId') productId: string,
  ) {
    return this.cartService.removeFromCart(+cartId, +productId);
  }
}
