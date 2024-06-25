import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

export function createUserSwaggerDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Creates a new user.',
    }),
    ApiBody({ type: CreateUserDto }),
    ApiResponse({
      status: 201,
      description: 'The created user',
      type: User,
    }),
  );
}

export function removeUserSwaggerDocs() {
  return applyDecorators(
    ApiOperation({ summary: 'Removes a user.' }),
    ApiParam({
      name: 'userId',
      description: 'The ID of the user to be removed',
    }),
    ApiResponse({
      status: 200,
      description: 'The deleted user',
      type: User,
    }),
    ApiResponse({
      status: 404,
      description: 'User not found',
    }),
  );
}
