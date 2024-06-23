import { Controller, Get, Post, Body, Put, Param, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(
    @Query('userId') userId: string,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.createOrder(+userId, createOrderDto);
  }

  @Get(':orderId')
  viewOrder(@Param('orderId') orderId: string) {
    return this.ordersService.viewOrder(+orderId);
  }

  @Put(':id')
  updateStatus(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.updateStatus(+id, updateOrderDto);
  }
}
