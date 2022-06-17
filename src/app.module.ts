import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import{ TypeOrmModule} from '@nestjs/typeorm'
import { EventModule } from './event/event.module';
import { ContentsModule } from './contents/contents.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { MonitorsModule } from './monitors/monitors.module';
import { PlayistContentModule } from './playist_content/playist_content.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/auth.jwt/jwt-auth.guard";


@Module({
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5434,
    username: 'platform',
    password: 'platform',
    database: 'platform',
    synchronize: false,
    autoLoadEntities: true,
  }), EventModule, MonitorsModule, PlaylistsModule, ContentsModule, PlayistContentModule, AuthModule],

})
export class AppModule {}
