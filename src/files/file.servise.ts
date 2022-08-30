import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { Content } from '../contents/content.entity';
import { FileTypes } from '../contents/types/types';
import { User } from '../users/user.entity';

@Injectable()
export class FileService {
  logger = new Logger(FileService.name);
  private s3: S3;

  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.s3 = new S3({
      endpoint: 'https://storage.yandexcloud.net/',
      accessKeyId: 'YCAJEYs_PWu6vtVYiUiWM9ZWF',
      secretAccessKey: 'YCNWo0VQY2TKAxfKE_Zn2DOnmC8RSQQDdINeKmhL',
    });
  }

  async uploadFile(file: any, auth0Id: User['auth0Id']) {
    try {
      const uploadResult = await this.s3
        .upload({
          Bucket: 'ildarminurov/images',
          Body: file.buffer,
          Key: `${uuid()}-${file.originalname}`,
        })
        .promise();

      const user = await this.userRepository.findOne({
        where: { auth0Id },
        select: ['id'],
      });

      return this.contentRepository.save({
        key: uploadResult.Key,
        fileType: FileTypes.PICTURE,
        title: 'content',
        userId: user.id,
      });
    } catch (e) {
      throw new InternalServerErrorException(`uploadFile ${e}`);
    }
  }
}
