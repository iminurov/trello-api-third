import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsDate, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Event } from '../event/event.entity';
import { Playlist } from '../playlists/playlist.entity';

@Entity('Monitor')
export class Monitor {
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
    description: 'Уникальный идентификатор связи с событием',
  })
  @IsString({ always: true })
  @Column()
  eventId: string;

  @ApiProperty({ example: 'Apple', description: 'Назнвание монитора' })
  @IsString({ always: true })
  @Column()
  name: string;

  @ApiProperty({
    example: '01.01.2021',
    description: 'Дата начала продажи монитора',
  })
  @IsString({ always: true })
  @Column()
  createAt: string;

  @ApiProperty({
    example: '01.01.2021',
    description: 'Дата обновления монитора',
  })
  @IsString({ always: true })
  @Column()
  updateAt: string;

  @ManyToOne(() => Event, (event) => event.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  event: Event;

  @OneToOne(() => Playlist, (playlist) => playlist.monitorsId)
  @JoinColumn()
  playlist: Playlist;

  // @OneToOne(() => Playlist, (monitorId) => monitorId.monitor)
  // @JoinColumn()
  // playlist: Playlist

  // public event: EventEntity;
}
