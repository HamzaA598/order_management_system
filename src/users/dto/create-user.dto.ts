import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the user',
  })
  password: string;

  @ApiProperty({
    example: 'John Smith. 999 Anywhere St., Apt 555 Medford MA 02155',
    description: 'The address of the user',
  })
  address: string;
}
