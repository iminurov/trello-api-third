import {
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.servise';
import { Multer } from 'multer';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('files')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('/files')
export class FileController {
  logger = new Logger(FileController.name);

  constructor(private readonly fileService: FileService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Загрузка файла' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({
    type: 'string',
    description: 'данные файла',
  })
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Multer.File, @CurrentUser() user: any) {
    return this.fileService.uploadFile(file, user.sub);
  }
}
