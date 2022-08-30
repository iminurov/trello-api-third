import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { User } from './users/user.entity';

import { Event } from './event/event.entity';
import { PlaylistsModule } from './playlists/playlists.module';
import { EventModule } from './event/event.module';
import { MonitorsModule } from './monitors/monitors.module';
import { ContentsModule } from './contents/contents.module';
import { Monitor } from './monitors/monitor.entity';
import { Playlist } from './playlists/playlist.entity';
import { PlaylistContentTable } from './contents/RelationPlaylistContent';

import { FileModule } from './files/file.module';
import { AuthModule } from './aut0/auth.module';
import { Content } from './contents/content.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'nest-course',
      synchronize: false,
      autoLoadEntities: true,
      entities: [User, Event, Monitor, Playlist, PlaylistContentTable, Content],
    }),
    TypeOrmModule.forFeature([]),
    UserModule,
    EventModule,
    MonitorsModule,
    PlaylistsModule,
    ContentsModule,
    FileModule,
    AuthModule,
  ],
  exports: [],
})
export class AppModule {}
