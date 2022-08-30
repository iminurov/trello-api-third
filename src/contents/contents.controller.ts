import { Crud, CrudController } from '@nestjsx/crud';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Content } from './content.entity';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ContentOwnerGuard } from './content.guards';

@Crud({
  model: {
    type: Content,
  },
  dto: {
    create: CreateContentDto,
  },
  routes: {
    createOneBase: {
      decorators: [
        UseGuards(AuthGuard('jwt')),
        UseInterceptors(FileInterceptor('fileType')),
        ApiOperation({ summary: 'Создать контент' }),
        ApiResponse({ status: 200, type: CreateContentDto }),
      ],
    },
    updateOneBase: {
      decorators: [
        UseGuards(ContentOwnerGuard),
        UseGuards(AuthGuard('jwt')),
        ApiOperation({ summary: 'Изменить контент' }),
        ApiResponse({ status: 200 }),
      ],
    },

    deleteOneBase: {
      decorators: [
        UseGuards(ContentOwnerGuard),
        UseGuards(AuthGuard('jwt')),
        ApiOperation({ summary: 'Удалить контент' }),
        ApiResponse({ status: 200, type: CreateContentDto }),
      ],
    },
    exclude: [],
  },
})
@ApiTags('Contents')
@ApiBearerAuth()
@Controller('/contents')
export class ContentsController implements CrudController<Content> {
  constructor(public service: ContentsService) {}
}
