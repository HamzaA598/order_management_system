import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}
  // TODO: should i first check if the user and the product exists and throw a descriptive error?

  // TODO: can't add to cart if the stock is not enough
  async addToCart(addToCartDto: AddToCartDto) {
    const { userId, productId, quantity } = addToCartDto;

    // create a cart if it does not exist
    const cart = await this.prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });

    await this.prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.cartId, productId } },
      update: { quantity: quantity },
      create: { cartId: cart.cartId, productId, quantity },
    });

    return await this.prisma.cart.findUnique({
      where: { cartId: cart.cartId },
      include: { cartItems: { include: { product: true } } },
    });
  }

  async viewCart(userId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId: userId },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.cartItems.length === 0)
      throw new NotFoundException(`Cart for user ID ${userId} is empty`);

    return cart;
  }

  // TODO: can't update to cart if the stock is not enough
  // TODO: should PUT create the cartItem if it does not exist?
  async updateCart(cartId: number, updateCartDto: UpdateCartDto) {
    const { productId, quantity } = updateCartDto;

    const cart = await this.prisma.cart.findUnique({
      where: { cartId: cartId },
    });

    if (!cart)
      throw new NotFoundException(`Cart for user ID ${cartId} is empty`);

    await this.prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.cartId, productId } },
      update: { quantity },
      create: { cartId: cart.cartId, productId, quantity },
    });

    return await this.prisma.cart.findUnique({
      where: { cartId: cart.cartId },
      include: { cartItems: { include: { product: true } } },
    });
  }

  async removeFromCart(cartId: number, productId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { cartId: cartId },
    });

    if (!cart) throw new NotFoundException(`Cart ${cartId} is empty`);

    const cartItem = await this.prisma.cartItem.findUnique({
      where: { cartId_productId: { cartId: cartId, productId: productId } },
    });

    if (!cartItem)
      throw new NotFoundException(
        `Product ID ${productId} for cart ID ${cartId} is not found`,
      );

    await this.prisma.cartItem.delete({
      where: { cartId_productId: { cartId: cartId, productId: productId } },
      include: { product: true },
    });

    return await this.prisma.cart.findUnique({
      where: { cartId: cartId },
      include: { cartItems: { include: { product: true } } },
    });
  }
}
