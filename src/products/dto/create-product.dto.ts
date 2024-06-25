import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Wireless Mouse',
    description: 'The name of the product',
  })
  name: string;

  @ApiProperty({
    example: '',
    description: 'The description of the product',
  })
  description: string;

  @ApiProperty({
    example: 10,
    description: 'The price of the product',
  })
  price: number;

  @ApiProperty({
    example: 15,
    description: 'The amount of product units that exist in the stock',
  })
  stock: number;
}
