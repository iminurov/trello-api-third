import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from './file.controller';
import { Content } from '../contents/content.entity';
import { FileService } from './file.servise';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Content, User])],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
