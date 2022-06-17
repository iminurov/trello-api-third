import { Injectable } from "@nestjs/common";
import { EventEntity } from "./event.entity";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CompaniesService extends TypeOrmCrudService<EventEntity> {
  constructor(@InjectRepository(EventEntity) repo) {
    super(repo);
  }
}

export class EventService {
}