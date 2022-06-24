import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Playlist } from './playlist.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlaylistsService extends TypeOrmCrudService<Playlist> {
  constructor(@InjectRepository(Playlist) repo) {
    super(repo);
  }
}
