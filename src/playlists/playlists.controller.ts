import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { PlaylistsService } from './playlists.service';
import { Playlist } from './playlist.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { CreateEventDto } from '../event/dto/create-event.dto';

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
        // UseGuards(JwtAuthGuard),
        ApiOperation({ summary: 'Создать новый плейлист' }),
        ApiResponse({ status: 200, type: CreatePlaylistDto }),
      ],
    },
    updateOneBase: {
      decorators: [
        // UseGuards(JwtAuthGuard),
        ApiOperation({ summary: 'Изменить плейлист' }),
        ApiResponse({ status: 200, type: UpdatePlaylistDto }),
      ],
    },
    getOneBase: {
      decorators: [
        ApiOperation({ summary: 'Получить событие' }),
        ApiResponse({ status: 200, type: CreatePlaylistDto }),
      ],
    },
    createManyBase: {
      decorators: [
        ApiOperation({ summary: 'Создать много событий' }),
        ApiResponse({ status: 200, type: CreatePlaylistDto }),
      ],
    },
    getManyBase: {
      decorators: [
        ApiOperation({ summary: 'Получить все события' }),
        ApiResponse({ status: 200, type: CreatePlaylistDto }),
      ],
    },
    deleteOneBase: {
      decorators: [
        ApiOperation({ summary: 'Удалить плейлист' }),
        ApiResponse({ status: 200, type: CreatePlaylistDto }),
      ],
    },
  },
})
@ApiTags('Плейлисты')
@Controller('playlist')
export class PlaylistsController implements CrudController<Playlist> {
  constructor(public service: PlaylistsService) {}
}
