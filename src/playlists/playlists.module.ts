import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { Content } from '../contents/content.entity';
import { PlaylistContentTable } from '../contents/RelationPlaylistContent';
import { Monitor } from '../monitors/monitor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Playlist,
      Content,
      Monitor,
      PlaylistContentTable,
    ]),
  ],
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
  exports: [PlaylistsService],
})
export class PlaylistsModule {}
