import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Monitor } from './monitor.entity';
import { MonitorsService } from './monitors.service';
import { CreateUserDto, UpdateUserDto } from '../user/dto/create-user.dto';
import { CreateMonitorDto } from './dto/create-monitor.dto';
import { UpdateMonitorDto } from './dto/update-monitor.dto';
import { User } from '../user/user.entity';

@Crud({
  model: {
    type: Monitor,
  },
  dto: {
    create: CreateMonitorDto,
    update: UpdateMonitorDto,
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
        ApiOperation({ summary: 'Изменить экран' }),
        ApiResponse({ status: 200, type: UpdateMonitorDto }),
      ],
    },
    getOneBase: {
      decorators: [
        ApiOperation({ summary: 'Получить экран' }),
        ApiResponse({ status: 200, type: [Monitor] }),
      ],
    },
    createManyBase: {
      decorators: [
        ApiOperation({ summary: 'Создать много экранов' }),
        ApiResponse({ status: 200, type: CreateMonitorDto }),
      ],
    },
    getManyBase: {
      decorators: [
        ApiOperation({ summary: 'Получить все экраны' }),
        ApiResponse({ status: 200, type: [Monitor] }),
      ],
    },
    createOneBase: {
      decorators: [
        ApiOperation({ summary: 'Создать экран' }),
        ApiResponse({ status: 200, type: CreateMonitorDto }),
      ],
    },
  },
  query: {
    alwaysPaginate: false,
    softDelete: true,
    allow: ['name'],
    join: {
      users: {
        alias: '',
        exclude: ['email'],
        eager: true,
      },
      '': {
        eager: true,
        alias: '',
        allow: ['name'],
      },
      '1': {
        eager: true,
        alias: '',
      },
      projects: {
        eager: true,
        select: false,
      },
    },
  },
})
@ApiTags('Экраны')
@Controller('monitors')
export class MonitorsController implements CrudController<Monitor> {
  constructor(public service: MonitorsService) {}
}
