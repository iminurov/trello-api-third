import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Event } from '../event/event.entity';
import { Playlist } from '../playlists/playlist.entity';
import { User } from '../users/user.entity';

@Entity('Monitor')
export class Monitor {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор связи пользователя',
  })
  @IsNumber({ allowNaN: false })
  @Column()
  userId: User['id'];

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
  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @ApiProperty({
    example: '01.01.2021',
    description: 'Дата обновления монитора',
  })
  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.monitors, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Event, (event) => event.monitors, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  event: Event;

  @OneToOne(() => Playlist, (playlist) => playlist.monitors)
  @JoinColumn()
  playlist: Playlist;

  // @OneToOne(() => Playlist, (monitorId) => monitorId.monitor)
  // @JoinColumn()
  // playlist: Playlist

  // public event: EventEntity;
}
