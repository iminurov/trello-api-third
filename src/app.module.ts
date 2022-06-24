import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtAuthGuard } from './auth/jwt.auth.guard';
import { Event } from './event/event.entity';
import { PlaylistsModule } from './playlists/playlists.module';
import { EventModule } from './event/event.module';
import { MonitorsModule } from './monitors/monitors.module';
import { ContentsModule } from './contents/contents.module';
import { PlayistContentModule } from './playist_content/playist_content.module';
import { Monitor } from './monitors/monitor.entity';
import { Playlist } from './playlists/playlist.entity';
import { Content } from './contents/content.entity';
import { PlaylistContentTable } from './playist_content/RelationPlaylistContent';

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
      synchronize: true,
      autoLoadEntities: true,
      entities: [User, Event, Monitor, Playlist, PlaylistContentTable, Content],
    }),
    UserModule,
    AuthModule,
    EventModule,
    MonitorsModule,
    PlaylistsModule,
    ContentsModule,
    PlayistContentModule,
  ],
})
export class AppModule {}
