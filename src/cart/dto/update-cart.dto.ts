// TODO: do i need to import from other dtos and make this a partial type?
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the product to be updated in the cart',
  })
  productId: number;

  @ApiProperty({
    example: 2,
    description: 'Updated quantity of the product in the cart',
  })
  quantity: number;
}
