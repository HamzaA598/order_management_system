import { ApiProperty } from '@nestjs/swagger';

export class AddToCartDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the user adding the product to the cart',
  })
  userId: number;

  @ApiProperty({
    example: 2,
    description: 'ID of the product to be added to the cart',
  })
  productId: number;

  @ApiProperty({
    example: 3,
    description: 'Quantity of the product to be added',
  })
  quantity: number;
}
