import { ApiTags } from "@nestjs/swagger";
import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { PlaylistsService } from "./playlists.service";
import { PlaylistEntity } from "./playlist.entity";


@Crud({
  model: {
    type: PlaylistEntity
  },

 })
@ApiTags('Playlist')
@Controller('Cписок контента для показа')
export class PlaylistsController {
  constructor(public service: PlaylistsService) {}
}