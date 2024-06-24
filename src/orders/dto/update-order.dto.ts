import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty({
    example: 'shipped',
    description: 'The status of the order',
  })
  status: string;
}
