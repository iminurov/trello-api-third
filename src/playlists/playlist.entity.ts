import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Monitor } from '../monitors/monitor.entity';
import { PlaylistContentTable } from '../contents/RelationPlaylistContent';
import { User } from '../users/user.entity';

@Entity('Playlist')
export class Playlist {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор связи с пользователем',
  })
  @IsNumber({ allowNaN: false })
  @Column()
  userId: User['id'];

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор связи с монитором',
  })
  @IsString({ always: false })
  @Column()
  monitorsId: string;

  @ApiProperty({ example: 'Звуки природы', description: 'Назнвание плейлиста' })
  @IsString({ always: false })
  @Column()
  name: string;

  @ApiProperty({
    example: '01.01.2021',
    description: 'Дата создания плейлиста',
  })
  @IsString({ always: false })
  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @ApiProperty({
    example: '01.01.2021',
    description: 'Дата обновления плейлиста',
  })
  @IsString({ always: false })
  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.playlist, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @OneToOne(() => Monitor, (monitor) => monitor.playlist)
  monitors: Monitor;

  @OneToMany(
    () => PlaylistContentTable,
    (PlaylistContentTable) => PlaylistContentTable.playlist,
  )
  PlaylistContent: PlaylistContentTable[];
}
