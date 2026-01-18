import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { IUserRepository } from '@domain/repositories/user.repository.interface';
import { User } from '@domain/entities/user.entity';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { roles: { include: { role: true } } },
    });

    if (!user) return null;

    return new User(
      user.id,
      user.email,
      user.passwordHash,
      user.name,
      user.roles.map((ur) => ur.role.name),
      user.createdAt,
    );
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { roles: { include: { role: true } } },
    });

    if (!user) return null;

    return new User(
      user.id,
      user.email,
      user.passwordHash,
      user.name,
      user.roles.map((ur) => ur.role.name),
      user.createdAt,
    );
  }

  async create(user: User): Promise<User> {
    // Implementação básica, num cenário real precisaria lidar com roles
    const created = await this.prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        passwordHash: user.passwordHash,
        name: user.name,
      },
    });
    return new User(created.id, created.email, created.passwordHash, created.name, [], created.createdAt);
  }
}
