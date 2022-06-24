import { Crud, CrudController } from '@nestjsx/crud';
import { Controller } from '@nestjs/common';
import { PlayistContentService } from './playist_content.service';
import { CreatePlayistContentDto } from './dto/create-playist_content.dto';
import { UpdatePlayistContentDto } from './dto/update-playist_content.dto';
import { ApiTags } from '@nestjs/swagger';
import { PlaylistContentTable } from './RelationPlaylistContent';

@Crud({
  model: {
    type: PlaylistContentTable,
  },
  dto: {
    create: CreatePlayistContentDto,
    update: UpdatePlayistContentDto,
  },
})
@ApiTags('P-C-relation')
@Controller('PlaylistContent')
export class Playist_contentController
  implements CrudController<PlaylistContentTable>
{
  constructor(public service: PlayistContentService) {}
}
