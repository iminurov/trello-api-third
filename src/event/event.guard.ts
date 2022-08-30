import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { User } from '../users/user.entity';

@Injectable()
export class EventsOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(Event)
    readonly eventRepository: Repository<Event>,
    @InjectRepository(User)
    readonly userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const eventId = request.body.eventId || request.params.id;
    const currentUserId = await request.user.sub;
    const user = await this.userRepository.findOne({
      where: { auth0Id: currentUserId },
      select: ['id'],
    });
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      select: ['userId'],
    });

    if (!event) {
      throw new NotFoundException();
    }

    return user.id === event.userId;
  }
}
