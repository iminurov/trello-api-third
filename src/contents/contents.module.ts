import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './content.entity';
import { Playlist } from '../playlists/playlist.entity';
import { PlaylistContentTable } from '../playist_content/RelationPlaylistContent';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Content,
      Playlist,
      Content,
      PlaylistContentTable,
    ]),
  ],
  controllers: [ContentsController],
  providers: [ContentsService],
  exports: [ContentsService],
})
export class ContentsModule {}
