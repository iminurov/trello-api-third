import { Injectable } from '@nestjs/common';
import { CreatePlayistContentDto } from './dto/create-playist_content.dto';
import { UpdatePlayistContentDto } from './dto/update-playist_content.dto';

@Injectable()
export class PlayistContentService {
  create(createPlayistContentDto: CreatePlayistContentDto) {
    return 'This action adds a new playistContent';
  }

  findAll() {
    return `This action returns all playistContent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playistContent`;
  }

  update(id: number, updatePlayistContentDto: UpdatePlayistContentDto) {
    return `This action updates a #${id} playistContent`;
  }

  remove(id: number) {
    return `This action removes a #${id} playistContent`;
  }
}
