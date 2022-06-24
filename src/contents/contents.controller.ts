import { Crud, CrudController } from '@nestjsx/crud';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Content } from './content.entity';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-event.dto';
import { ContentOwnerGuard } from './content.guards';

@Crud({
  model: {
    type: Content,
  },
  dto: {
    create: CreateContentDto,
    update: UpdateContentDto,
  },
  // в роутах прописываются Guards и Api-шки
  routes: {
    createOneBase: {
      decorators: [
        // UseGuards(JwtAuthGuard),
        UseGuards(ContentOwnerGuard),
        ApiOperation({ summary: 'Создать контент' }),
        ApiResponse({ status: 200, type: CreateContentDto }),
      ],
    },
    updateOneBase: {
      decorators: [
        // UseGuards(JwtAuthGuard),
        UseGuards(ContentOwnerGuard),
        ApiOperation({ summary: 'Изменить контент' }),
        ApiResponse({ status: 200, type: UpdateContentDto }),
      ],
    },
    deleteOneBase: {
      decorators: [
        UseGuards(ContentOwnerGuard),
        ApiOperation({ summary: 'Удалить контент' }),
        ApiResponse({ status: 200, type: [Content] }),
      ],
    },
  },
  // exclude: [],
})
@ApiTags('Контент для плейлистов')
@Controller('contents')
export class ContentsController implements CrudController<Content> {
  constructor(public service: ContentsService) {}
}
