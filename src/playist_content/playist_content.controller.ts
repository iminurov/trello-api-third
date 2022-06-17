import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlayistContentService } from './playist_content.service';
import { CreatePlayistContentDto } from './dto/create-playist_content.dto';
import { UpdatePlayistContentDto } from './dto/update-playist_content.dto';

@Controller('playist-content')
export class PlayistContentController {
  constructor(private readonly playistContentService: PlayistContentService) {}

  @Post()
  create(@Body() createPlayistContentDto: CreatePlayistContentDto) {
    return this.playistContentService.create(createPlayistContentDto);
  }

  @Get()
  findAll() {
    return this.playistContentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playistContentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayistContentDto: UpdatePlayistContentDto) {
    return this.playistContentService.update(+id, updatePlayistContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playistContentService.remove(+id);
  }
}
