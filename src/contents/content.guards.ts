import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Content } from './content.entity';

@Injectable()
export class ContentOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(Content)
    readonly contentRepository: Repository<Content>,
    @InjectRepository(User)
    readonly userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const contentId = request.body.contentId || request.params.id;
    const currentUserId = await request.user.sub;
    const user = await this.userRepository.findOne({
      where: { auth0Id: currentUserId },
      select: ['id'],
    });
    const content = await this.contentRepository.findOne({
      where: { id: contentId },
      select: ['userId'],
    });

    if (!content) {
      throw new NotFoundException();
    }

    return user.id === content.userId;
  }
}
