import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  createOrderSwaggerDocs,
  updateOrderStatusSwaggerDocs,
  viewOrderSwaggerDocs,
} from './orders.decorator';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @createOrderSwaggerDocs()
  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @viewOrderSwaggerDocs()
  @Get(':orderId')
  viewOrder(@Param('orderId') orderId: string) {
    return this.ordersService.viewOrder(+orderId);
  }

  @updateOrderStatusSwaggerDocs()
  @Put(':orderId/status')
  updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.updateOrderStatus(+orderId, updateOrderDto);
  }
}
