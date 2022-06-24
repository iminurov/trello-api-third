import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Content } from './content.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContentsService extends TypeOrmCrudService<Content> {
  constructor(@InjectRepository(Content) repo) {
    super(repo);
  }
}
