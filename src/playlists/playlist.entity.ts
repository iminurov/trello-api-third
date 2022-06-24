import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsDate, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Monitor } from '../monitors/monitor.entity';
import { PlaylistContentTable } from '../playist_content/RelationPlaylistContent';

@Entity('Playlist')
export class Playlist {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор связи с организатором',
  })
  @IsString({ always: true })
  @Column()
  userId: string;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор связи с монитором',
  })
  @IsString({ always: true })
  @Column()
  monitorsId: string;

  @ApiProperty({ example: 'Звуки природы', description: 'Назнвание плейлиста' })
  @IsString({ always: true })
  @Column()
  name: string;

  @ApiProperty({
    example: '01.01.2021',
    description: 'Дата создания плейлиста',
  })
  @IsString({ always: true })
  @Column()
  createAt: string;

  @ApiProperty({
    example: '01.01.2021',
    description: 'Дата обновления плейлиста',
  })
  @IsString({ always: true })
  @Column()
  updateAt: string;

  @OneToOne(() => Monitor, (monitor) => monitor.id)
  monitor: Monitor;

  @OneToMany(
    () => PlaylistContentTable,
    (PlaylistContentTable) => PlaylistContentTable.playlistId,
  )
  PlaylistContent: PlaylistContentTable[];
}

// @ManyToMany(()=> Content, () => Playist_Content)
// contents: Content[];

// @OneToOne(() => MonitorEntity)
// monitor: MonitorEntity;
//
// @OneToMany(() => Playist_Content, (playlistId) => playlistId.playlist)
// @Type(() => Playist_Content)
//
//
//
// @OneToMany(() => MonitorEntity, (eventId) => eventId.event)
// @Type(() => Playist_Content)
// playistContentEntities?: Playist_Content[];
