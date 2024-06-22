import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  // figure out DTOs

  create(createCartDto: CreateCartDto) {
    return 'This action adds a new cart';
  }

  addToCart(createCartDto: CreateCartDto) {
    return "This action adds a product to the user's cart or updates the quantity if the product is already in the cart.";
  }

  viewCart(userId: number) {
    return `This action retrieves a #${userId} cart`;
  }

  updateCart(updateCartDto: UpdateCartDto) {
    return `This action updates the quantity of a product in the cart`;
  }

  removeFromCart() {
    return `This action removes a product from a cart`;
  }
}
