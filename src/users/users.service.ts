import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
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

  async remove(userId: number) {
    return await this.prisma.user.delete({
      where: { userId: userId },
    });
  }
}
