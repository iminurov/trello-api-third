import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistContentTable } from './RelationPlaylistContent';

@Injectable()
export class PlayistContentService extends TypeOrmCrudService<PlaylistContentTable> {
  constructor(@InjectRepository(PlaylistContentTable) repo) {
    super(repo);
  }
}
