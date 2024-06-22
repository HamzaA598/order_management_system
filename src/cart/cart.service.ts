import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}
  // TODO: figure out DTOs

  create(createCartDto: CreateCartDto) {
    return 'This action adds a new cart';
  }

  async addToCart(addToCartDto: AddToCartDto) {
    const { userId, productId, quantity } = addToCartDto;

    const cart = await this.prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });

    const cartItem = await this.prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.cartId, productId } },
      update: { quantity: { increment: quantity } },
      create: { cartId: cart.cartId, productId, quantity },
    });

    return cartItem;
  }

  // TODO: up to which level of detail? should i display product info?
  async viewCart(userId: number) {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: {
        cartItems: {
          // include: {
          //   product: true,
          // },
        },
      },
    });
  }

  updateCart(updateCartDto: UpdateCartDto) {
    return `This action updates the quantity of a product in the cart`;
  }

  removeFromCart() {
    return `This action removes a product from a cart`;
  }
}
