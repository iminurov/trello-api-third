import { Module } from '@nestjs/common';
import { MonitorsService } from './monitors.service';
import { MonitorsController } from './monitors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Monitor } from './monitor.entity';
import { Event } from '../event/event.entity';
import { Playlist } from '../playlists/playlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Monitor, Event, Playlist])],
  controllers: [MonitorsController],
  providers: [MonitorsService],
  exports: [MonitorsService],
})
export class MonitorsModule {}
