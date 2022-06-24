import { Injectable } from '@nestjs/common';
import { Event } from './event.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventsService extends TypeOrmCrudService<Event> {
  constructor(@InjectRepository(Event) repo) {
    super(repo);
  }
}
