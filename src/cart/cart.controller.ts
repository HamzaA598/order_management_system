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
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('create')
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Post('add')
  addToCart(@Body() createCartDto: CreateCartDto) {
    return this.cartService.addToCart(createCartDto);
  }

  @Get(':userId')
  viewCart(@Param('userId') userId: string) {
    return this.cartService.viewCart(+userId);
  }

  // TODO: how to pass the cart id when there is not :id in the endpoint?
  @Put('update')
  updateCart(@Body() updateCartDto: UpdateCartDto) {
    return this.cartService.updateCart(updateCartDto);
  }

  // TODO: how to pass the cart id when there is not :id in the endpoint?
  @Delete('remove')
  removeFromCart() {
    return this.cartService.removeFromCart();
  }
}
