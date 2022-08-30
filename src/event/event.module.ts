import { Module } from '@nestjs/common';
import { EventsService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { User } from '../users/user.entity';
import { Monitor } from '../monitors/monitor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Monitor, Event])],
  controllers: [EventController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventModule {}
