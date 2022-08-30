import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './content.entity';

@Injectable()
export class ContentsService extends TypeOrmCrudService<Content> {
  constructor(@InjectRepository(Content) repo) {
    super(repo);
  }
}
