import { Module } from '@nestjs/common';
import { PlayistContentService } from './playist_content.service';
import { Playist_contentController } from './playist_content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistContentTable } from './RelationPlaylistContent';
import { Playlist } from '../playlists/playlist.entity';
import { Content } from '../contents/content.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlaylistContentTable, Playlist, Content]),
  ],
  controllers: [Playist_contentController],
  providers: [PlayistContentService],
  exports: [PlayistContentService],
})
export class PlayistContentModule {}
