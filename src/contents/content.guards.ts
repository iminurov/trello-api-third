import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ContentsService } from './contents.service';

@Injectable()
export class ContentOwnerGuard implements CanActivate {
  constructor(private readonly contentService: ContentsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const contentId = request.params.id;
    const currentUserId = request.user.id;
    const content = await this.contentService.findOne(contentId);

    if (!content) {
      throw new NotFoundException();
    }

    return currentUserId === content.userId;
  }
}
