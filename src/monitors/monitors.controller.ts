import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Monitor } from './monitor.entity';
import { MonitorsService } from './monitors.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateMonitorDto, UpdateMonitorDto } from './dto/create-monitor.dto';

import { User } from '../users/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { MonitorsOwnerGuard } from './monitor.guard';

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
        UseGuards(MonitorsOwnerGuard),
        UseGuards(AuthGuard('jwt')),
        ApiOperation({ summary: 'Изменить экран' }),
        ApiResponse({ status: 200, type: UpdateMonitorDto }),
      ],
    },
    getOneBase: {
      decorators: [
        UseGuards(AuthGuard('jwt')),
        ApiOperation({ summary: 'Получить экран' }),
        ApiResponse({ status: 200, type: UpdateMonitorDto }),
      ],
    },
    createManyBase: {
      decorators: [
        UseGuards(AuthGuard('jwt')),
        ApiOperation({ summary: 'Создать много экранов' }),
        ApiResponse({ status: 200, type: CreateMonitorDto }),
      ],
    },
    getManyBase: {
      decorators: [
        UseGuards(AuthGuard('jwt')),
        ApiOperation({ summary: 'Получить все экраны' }),
        ApiResponse({ status: 200, type: CreateUserDto }),
      ],
    },
    createOneBase: {
      decorators: [
        UseGuards(AuthGuard('jwt')),
        ApiOperation({ summary: 'Создать экран' }),
        ApiResponse({ status: 200, type: CreateMonitorDto }),
      ],
    },
    deleteOneBase: {
      decorators: [
        UseGuards(MonitorsOwnerGuard),
        ApiOperation({ summary: 'Удалить экран' }),
        ApiResponse({ status: 200, type: CreateMonitorDto }),
      ],
    },
  },
})
@ApiTags('Monitors')
@ApiBearerAuth()
@Controller('/monitors')
export class MonitorsController implements CrudController<Monitor> {
  constructor(public service: MonitorsService) {}
}
