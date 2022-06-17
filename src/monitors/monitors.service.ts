import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { MonitorEntity } from "./monitor.entity";

@Injectable()
export class CompaniesService extends TypeOrmCrudService<MonitorEntity> {
  constructor(@InjectRepository(MonitorEntity) repo) {
    super(repo);
  }
}

export class MonitorsService {
}