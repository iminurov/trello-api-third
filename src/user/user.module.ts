import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from '../auth/auth.module';
import { Event } from '../event/event.entity';
import { Content } from '../contents/content.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Event, Content]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
