import { Module } from '@nestjs/common';
import { UserService } from '@application/services/user.service';
import { DatabaseModule } from '@infrastructure/database.module';
import { PrismaUserRepository } from '@infrastructure/repositories/prisma-user.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserService,
    {
      provide: 'IUserRepository',
      useClass: PrismaUserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
