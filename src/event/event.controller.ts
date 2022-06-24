import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller } from '@nestjs/common';
import { EventsService } from './event.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreatePlaylistDto } from '../playlists/dto/create-playlist.dto';
// import { CreateEventDto } from "./dto/create-event.dto";
// import { UpdateEventDto } from "./dto/update-event.dto";

@Crud({
  model: {
    type: Event,
  },
  dto: {
    create: CreateEventDto,
    update: UpdateEventDto,
  },
  params: {
    id: {
      field: 'id',
      type: 'string',
      primary: true,
    },
  },
  // в роутах прописываются Guards и Api-шки
  routes: {
    updateOneBase: {
      decorators: [
        ApiOperation({ summary: 'ИЗменить событие' }),
        ApiResponse({ status: 200, type: CreateEventDto }),
      ],
    },
    getOneBase: {
      decorators: [
        ApiOperation({ summary: 'Получить событие' }),
        ApiResponse({ status: 200, type: [Event] }),
      ],
    },
    createManyBase: {
      decorators: [
        ApiOperation({ summary: 'Создать много событий' }),
        ApiResponse({ status: 200, type: CreateEventDto }),
      ],
    },
    getManyBase: {
      decorators: [
        ApiOperation({ summary: 'Получить все события' }),
        ApiResponse({ status: 200, type: [Event] }),
      ],
    },
    createOneBase: {
      decorators: [
        ApiOperation({ summary: 'Создать событие' }),
        ApiResponse({ status: 200, type: CreateEventDto }),
      ],
    },
  },
})
@ApiTags('Event')
@Controller('Мероприятие')
export class EventController implements CrudController<Event> {
  constructor(public service: EventsService) {}
}
