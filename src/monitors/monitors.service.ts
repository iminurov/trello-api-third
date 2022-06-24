import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Monitor } from './monitor.entity';

@Injectable()
export class MonitorsService extends TypeOrmCrudService<Monitor> {
  constructor(@InjectRepository(Monitor) repo) {
    super(repo);
  }
}
