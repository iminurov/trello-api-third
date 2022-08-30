import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Playlist } from './playlist.entity';

@Injectable()
export class PlaylistOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(Playlist)
    readonly playlistRepository: Repository<Playlist>,
    @InjectRepository(User)
    readonly userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const playlistId = request.body.playlistId || request.params.id;
    const currentUserId = await request.user.sub;
    const user = await this.userRepository.findOne({
      where: { auth0Id: currentUserId },
      select: ['id'],
    });
    const playlist = await this.playlistRepository.findOne({
      where: { id: playlistId },
      select: ['userId'],
    });

    if (!playlist) {
      throw new NotFoundException();
    }

    return user.id === playlist.userId;
  }
}
