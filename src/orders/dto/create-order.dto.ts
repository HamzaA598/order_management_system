// TODO: status should be enum
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the user creating the order',
  })
  userId: number;

  @ApiProperty({
    example: 'shipped',
    description: 'The status of the order',
  })
  status: string;
}
