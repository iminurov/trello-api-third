import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Monitor } from './monitor.entity';

@Injectable()
export class MonitorsOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(Monitor)
    readonly monitorRepository: Repository<Monitor>,
    @InjectRepository(User)
    readonly userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const monitorId = request.body.monitorsId || request.params.id;
    const currentUserId = await request.user.sub;
    const user = await this.userRepository.findOne({
      where: { auth0Id: currentUserId },
      select: ['id'],
    });
    const monitor = await this.monitorRepository.findOne({
      where: { id: monitorId },
      select: ['userId'],
    });

    if (!monitor) {
      throw new NotFoundException();
    }

    return user.id === monitor.userId;
  }
}
