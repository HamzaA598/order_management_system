import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  // TODO: i need the user id, maybe the cart id too
  // TODO: user id is a query parameter?
  // TODO: set default value to status, do not send it in request body
  async createOrder(userId: number, createOrderDto: CreateOrderDto) {
    const { status } = createOrderDto;

    // get user cart
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!cart)
      throw new NotFoundException(`Cart for user ID ${userId} not found`);

    const cartId: number = cart.cartId;

    // get cartItems from cart
    const cartItems = await this.prisma.cartItem.findMany({
      where: {
        cartId: cartId,
      },
      include: { product: true },
    });

    // TODO: descriptive exception
    if (cartItems.length === 0)
      throw new NotFoundException("can't create an order with an empty cart");

    // save order
    const order = await this.prisma.order.create({
      data: {
        userId: userId,
        status: status,
      },
    });

    // Prepare data for insertion
    const cartItemsData = cartItems.map((item) => ({
      orderId: order.orderId,
      productId: item.productId,
      quantity: item.quantity,
    }));

    // save order items
    await this.prisma.orderItem.createMany({
      data: cartItemsData,
    });

    // calculate total price
    // TODO: update total price on adding every product to cart?
    const totalPrice = cartItems.reduce((total, item) => {
      return total + item.quantity * item.product.price;
    }, 0);

    const pricedOrder = await this.prisma.order.update({
      where: { orderId: order.orderId },
      data: {
        totalPrice: totalPrice,
      },
    });

    // TODO: should i clear cart after creating an order?
    // clear cart
    await this.prisma.cartItem.deleteMany({
      where: { cartId: cartId },
    });

    return pricedOrder;
  }

  viewOrder(orderId: number) {
    return this.prisma.order.findUnique({
      where: { orderId: orderId },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  updateStatus(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }
}
