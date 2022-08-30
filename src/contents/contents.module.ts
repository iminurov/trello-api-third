import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './content.entity';
import { Playlist } from '../playlists/playlist.entity';
import { PlaylistContentTable } from './RelationPlaylistContent';
import { User } from '../users/user.entity';
import { Event } from '../event/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Event,
      Content,
      Playlist,
      PlaylistContentTable,
    ]),
  ],
  controllers: [ContentsController],
  providers: [ContentsService],
  exports: [ContentsService],
})
export class ContentsModule {}
