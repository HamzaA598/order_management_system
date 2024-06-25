import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  // TODO: isolate the logic of checking that a user exists

  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, address } = createUserDto;

    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
        address,
      },
    });

    return newUser;
  }

  async viewOrders(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { userId: userId },
    });

    if (!user) throw new NotFoundException(`User ${userId} is not found`);

    return await this.prisma.order.findMany({
      where: { userId: userId },
      include: { orderItems: { include: { product: true } } },
    });
  }

  async remove(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { userId: userId },
    });

    if (!user) throw new NotFoundException(`User ${userId} is not found`);

    return await this.prisma.user.delete({
      where: { userId: userId },
    });
  }
}
