import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

import { Event } from '../event/event.entity';
import { Content } from '../contents/content.entity';
import { UserService } from './user.service';
import { Monitor } from '../monitors/monitor.entity';
import { Playlist } from '../playlists/playlist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Event, Monitor, Playlist, Content]),
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
