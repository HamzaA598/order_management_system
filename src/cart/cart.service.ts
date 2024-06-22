import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}
  // TODO: figure out DTOs
  // TODO: should i first check if the user and the product exists and throw a descriptive error?

  // TODO: can't add to cart if the stock is not enough
  // TODO: should addToCart create a cart if it does not exist?
  // or should i implement a create function?
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

  // TODO: can't update to cart if the stock is not enough
  // TODO: should PUT create the cartItem if it does not exist?
  async updateCart(
    userId: number,
    productId: number,
    updateCartDto: UpdateCartDto,
  ) {
    const { quantity } = updateCartDto;

    const cart = await this.prisma.cart.findUnique({ where: { userId } });

    if (!cart)
      throw new NotFoundException(`Cart for user ID ${userId} not found`);

    const cartItem = await this.prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.cartId, productId } },
      update: { quantity },
      create: { cartId: cart.cartId, productId, quantity },
    });

    return cartItem;
  }

  async removeFromCart(userId: number, productId: number) {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });

    if (!cart)
      throw new NotFoundException(`Cart for user ID ${userId} is not found`);

    const cartItem = await this.prisma.cartItem.findUnique({
      where: { cartId_productId: { cartId: cart.cartId, productId } },
    });

    if (!cartItem)
      throw new NotFoundException(
        `Product ID ${productId} for user ID ${userId} is not found`,
      );

    return this.prisma.cartItem.delete({
      where: { cartId_productId: { cartId: cart.cartId, productId } },
    });
  }
}
