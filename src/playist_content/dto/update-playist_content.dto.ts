import { PartialType } from '@nestjs/swagger';
import { CreatePlayistContentDto } from './create-playist_content.dto';

export class UpdatePlayistContentDto extends PartialType(
  CreatePlayistContentDto,
) {}
