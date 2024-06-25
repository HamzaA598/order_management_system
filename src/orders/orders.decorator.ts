import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

export function createOrderSwaggerDocs() {
  return applyDecorators(
    ApiOperation({
      summary:
        'Creates a new order for the specified user with the products in their cart.',
    }),
    ApiBody({ type: CreateOrderDto }),
    ApiResponse({
      status: 201,
      description: 'The created order',
      type: Order,
    }),
    ApiResponse({
      status: 404,
      description: 'Cart is empty',
    }),
  );
}

export function viewOrderSwaggerDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieves the order details by order ID.',
    }),
    ApiParam({
      name: 'orderId',
      description: 'The ID of the order to be retrieved',
    }),
    ApiResponse({
      status: 200,
      description: 'The requested order',
      type: Order,
    }),
    ApiResponse({
      status: 404,
      description: 'order not found',
    }),
  );
}

export function updateOrderStatusSwaggerDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Updates the status of an order.' }),
    ApiParam({
      name: 'orderId',
      description: 'The ID of the order whose status is to be updated',
    }),
    ApiBody({ type: UpdateOrderDto }),
    ApiResponse({
      status: 200,
      description: 'The order after updating the status',
      type: Order,
    }),
    ApiResponse({ status: 404, description: 'order not found' }),
  );
}
