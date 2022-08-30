import { OmitType } from '@nestjs/swagger';
import { Content } from '../content.entity';

export class CreateContentDto extends OmitType(Content, [
  'id',
  'playlistId',
  'title',
  'createAt',
  'updateAt',
]) {}
