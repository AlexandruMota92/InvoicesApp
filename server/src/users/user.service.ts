import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User } from './dto/user.dto';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  async getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }
}
