import { ApiTags } from "@nestjs/swagger";
import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { MonitorEntity } from "./monitor.entity";
import { MonitorsService } from "./monitors.service";

@Crud({
  model: {
    type: MonitorEntity
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
@ApiTags('Monitors')
@Controller('Экраны')
export class MonitorsController {
  constructor(public service: MonitorsService) {}
}