import { Module } from '@nestjs/common';
import { PlayistContentService } from './playist_content.service';
import { PlayistContentController } from './playist_content.controller';

@Module({
  controllers: [PlayistContentController],
  providers: [PlayistContentService]
})
export class PlayistContentModule {}
