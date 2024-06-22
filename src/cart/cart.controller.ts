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

  @Get(':userId')
  viewCart(@Param('userId') userId: string) {
    return this.cartService.viewCart(+userId);
  }

  // TODO: how to pass the cart id when there is not :id in the endpoint?
  // should i pass userId and productId in the url or in the body?
  @Put('update/:userId/:productId')
  updateCart(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.updateCart(+userId, +productId, updateCartDto);
  }

  // TODO: how to pass the cart id when there is not :id in the endpoint?
  // should i pass userId and productId in the url or in the body?
  @Delete('remove/:userId/:productId')
  removeFromCart(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.cartService.removeFromCart(+userId, +productId);
  }
}
