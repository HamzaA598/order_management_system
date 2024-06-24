import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({
    summary:
      'Creates a new order for the specified user with the products in their cart.',
  })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({
    status: 201,
    description: 'The created order',
    type: Order,
  })
  @ApiResponse({
    status: 404,
    description: 'cart is empty',
  })
  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @ApiOperation({
    summary: 'Retrieves the order details by order ID.',
  })
  @ApiParam({
    name: 'orderId',
    description: 'The ID of the order to be retrieved',
  })
  @ApiResponse({
    status: 200,
    description: 'The requested order',
    type: Order,
  })
  @ApiResponse({
    status: 404,
    description: 'order not found',
  })
  @Get(':orderId')
  viewOrder(@Param('orderId') orderId: string) {
    return this.ordersService.viewOrder(+orderId);
  }

  @ApiOperation({ summary: 'Updates the status of an order.' })
  @ApiParam({
    name: 'orderId',
    description: 'The ID of the order whose status is to be updated',
  })
  @ApiBody({ type: UpdateOrderDto })
  @ApiResponse({
    status: 200,
    description: 'The order after updating the status',
    type: Order,
  })
  @ApiResponse({ status: 404, description: 'order not found' })
  @Put(':orderId/status')
  updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.updateOrderStatus(+orderId, updateOrderDto);
  }
}
