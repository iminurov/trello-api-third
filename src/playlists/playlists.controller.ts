import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { PlaylistsService } from './playlists.service';
import { Playlist } from './playlist.entity';
import {
  CreatePlaylistDto,
  UpdatePlaylistDto,
} from './dto/create-playlist.dto';
import { AuthGuard } from '@nestjs/passport';
import { PlaylistOwnerGuard } from './playlist.guard';

@Crud({
  model: {
    type: Playlist,
  },
  dto: {
    create: CreatePlaylistDto,
    update: UpdatePlaylistDto,
  },
  routes: {
    createOneBase: {
      decorators: [
        UseGuards(AuthGuard('jwt')),
        ApiOperation({ summary: 'Создать новый плейлист' }),
        ApiResponse({ status: 200, type: CreatePlaylistDto }),
      ],
    },
    updateOneBase: {
      decorators: [
        UseGuards(PlaylistOwnerGuard),
        UseGuards(AuthGuard('jwt')),
        ApiOperation({ summary: 'Изменить плейлист' }),
        ApiResponse({ status: 200, type: UpdatePlaylistDto }),
      ],
    },
    getOneBase: {
      decorators: [
        UseGuards(AuthGuard('jwt')),
        ApiOperation({ summary: 'Получить событие' }),
        ApiResponse({ status: 200, type: CreatePlaylistDto }),
      ],
    },
    createManyBase: {
      decorators: [
        UseGuards(AuthGuard('jwt')),
        ApiOperation({ summary: 'Создать много событий' }),
        ApiResponse({ status: 200, type: CreatePlaylistDto }),
      ],
    },
    getManyBase: {
      decorators: [
        UseGuards(AuthGuard('jwt')),
        ApiOperation({ summary: 'Получить все события' }),
        ApiResponse({ status: 200, type: CreatePlaylistDto }),
      ],
    },
    deleteOneBase: {
      decorators: [
        UseGuards(PlaylistOwnerGuard),
        UseGuards(AuthGuard('jwt')),
        ApiOperation({ summary: 'Удалить плейлист' }),
        ApiResponse({ status: 200, type: CreatePlaylistDto }),
      ],
    },
  },
})
@ApiTags('Плейлисты')
@ApiBearerAuth()
@Controller('playlist')
export class PlaylistsController implements CrudController<Playlist> {
  constructor(public service: PlaylistsService) {}
}
