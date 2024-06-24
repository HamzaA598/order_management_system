import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  // TODO: should i also pass the cart id in the body?
  // TODO: user id is a query parameter or in the body?
  // TODO: set default value to status, do not send it in request body
  async createOrder(createOrderDto: CreateOrderDto) {
    const { userId, status } = createOrderDto;

    // get user cart
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId: userId,
      },
      include: { cartItems: { include: { product: true } } },
    });

    if (!cart || cart.cartItems.length === 0)
      throw new NotFoundException(`Cart for user ID ${userId} is empty`);

    // save order
    const order = await this.prisma.order.create({
      data: {
        userId: userId,
        status: status,
      },
    });

    // Prepare data for insertion
    const cartItemsData = cart.cartItems.map((item) => ({
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
    const totalPrice = cart.cartItems.reduce((total, item) => {
      return total + item.quantity * item.product.price;
    }, 0);

    const pricedOrder = await this.prisma.order.update({
      where: { orderId: order.orderId },
      data: {
        totalPrice: totalPrice,
      },
      include: { orderItems: { include: { product: true } } },
    });

    // clear current cart
    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.cartId },
    });

    return pricedOrder;
  }

  async viewOrder(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { orderId: orderId },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order)
      throw new NotFoundException(`Order with ID ${orderId} not found`);

    return order;
  }

  async updateOrderStatus(orderId: number, updateOrderDto: UpdateOrderDto) {
    const { status } = updateOrderDto;

    const order = await this.prisma.order.findUnique({
      where: { orderId: orderId },
    });

    if (!order)
      throw new NotFoundException(`Order with ID ${orderId} not found`);

    return await this.prisma.order.update({
      where: { orderId: orderId },
      data: { status: status },
      include: { orderItems: { include: { product: true } } },
    });
  }
}
