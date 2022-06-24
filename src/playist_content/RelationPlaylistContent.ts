import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt } from 'class-validator';
import { Content } from '../contents/content.entity';
import { Playlist } from '../playlists/playlist.entity';

@Entity()
export class PlaylistContentTable {
  // ВЫдавал ошибку, что нет примаригенератора, досбавил, посмотри пожалуйста
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  playlistId: string;

  @Column()
  contentId: string;

  @IsInt({ always: true })
  @Column()
  order: string;

  @IsInt({ always: true })
  @Column()
  durtion: string;

  @ManyToOne(() => Content, (content) => content.id)
  content: Content;

  @ManyToOne(() => Playlist, (playlist) => playlist.id)
  playlist: Playlist;
}
