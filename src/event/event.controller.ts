import { ApiTags } from "@nestjs/swagger";
import { Controller } from "@nestjs/common";
import { EventService } from "./event.service";
import { Crud } from "@nestjsx/crud";
import { EventEntity } from "./event.entity";

@Crud({
  model: {
    type: EventEntity
  },
  routes: {
    deleteOneBase: {
      returnDeleted: false,
    },
  },
  query: {
    alwaysPaginate: false,
    softDelete: true,
    allow: ['name'],
    join: {
      users: {
        alias: 'companyUsers',
        exclude: ['email'],
        eager: true,
      },
      'users.projects': {
        eager: true,
        alias: 'usersProjects',
        allow: ['name'],
      },
      'users.projects.company': {
        eager: true,
        alias: 'usersProjectsCompany',
      },
      projects: {
        eager: true,
        select: false,
      },
    },
  },
})
@ApiTags('Event')
@Controller('Мероприятие')
export class EventController {
  constructor(public service: EventService) {}
}