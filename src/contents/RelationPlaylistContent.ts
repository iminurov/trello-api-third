import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, IsString } from 'class-validator';
import { Content } from './content.entity';
import { Playlist } from '../playlists/playlist.entity';

@Entity()
export class PlaylistContentTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  playlistId: string;

  @Column()
  contentId: string;

  @IsString()
  @Column()
  order: string;

  @IsString()
  @Column()
  durtion: string;

  @ManyToOne(() => Content, (content) => content.PlaylistContent)
  content: Content;

  @ManyToOne(() => Playlist, (playlist) => playlist.PlaylistContent)
  playlist: Playlist;
}
