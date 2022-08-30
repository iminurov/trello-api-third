import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, UseGuards } from '@nestjs/common';
import { EventsService } from './event.service';
import { Event } from './event.entity';
import { CreateEventDto, UpdateEventDto } from './dto/create-event.dto';
import { AuthGuard } from '@nestjs/passport';
import { ContentOwnerGuard } from '../contents/content.guards';
import { EventsOwnerGuard } from './event.guard';
import { Crud, CrudController } from '@nestjsx/crud';

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

  routes: {
    updateOneBase: {
      decorators: [
        UseGuards(ContentOwnerGuard),
        UseGuards(AuthGuard('jwt')),
        ApiOperation({ summary: 'ИЗменить событие' }),
        ApiResponse({ status: 200, type: CreateEventDto }),
      ],
    },
    getOneBase: {
      decorators: [
        UseGuards(AuthGuard('jwt')),
        ApiOperation({ summary: 'Получить событие' }),
        ApiResponse({ status: 200, type: Event }),
      ],
    },
    createManyBase: {
      decorators: [
        UseGuards(AuthGuard('jwt')),
        ApiOperation({ summary: 'Создать много событий' }),
        ApiResponse({ status: 200, type: CreateEventDto }),
      ],
    },
    getManyBase: {
      decorators: [ApiOperation({ summary: 'Получить все события' })],
    },
    createOneBase: {
      decorators: [
        UseGuards(AuthGuard('jwt')),
        ApiOperation({ summary: 'Создать событие' }),
        ApiResponse({ status: 200, type: CreateEventDto }),
      ],
    },
    deleteOneBase: {
      decorators: [
        UseGuards(EventsOwnerGuard),
        ApiOperation({ summary: 'Удалить событие' }),
      ],
    },
  },
})
@ApiTags('events')
@ApiBearerAuth()
@Controller('/events')
export class EventController implements CrudController<Event> {
  constructor(public service: EventsService) {}
}
