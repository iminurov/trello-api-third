import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Event } from '../event/event.entity';
import { Content } from '../contents/content.entity';
import { Monitor } from '../monitors/monitor.entity';
import { Playlist } from '../playlists/playlist.entity';

@Entity('/Users')
export class User {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true, nullable: true })
  auth0Id: string;

  @ApiProperty({ example: 'minurovi@gmail.com', description: 'Почтовый ящик' })
  @Column({ unique: true, nullable: true })
  email: string;

  @ApiProperty({ example: 'Илья', description: 'Имя пользователя' })
  @Column({ nullable: true })
  firstName: string;

  @ApiProperty({ example: 'Крауз', description: 'Фамилия пользоваеля' })
  @Column({ nullable: true })
  lastName: string;

  @ApiProperty({ example: '01.01.2001', description: 'Дата создания' })
  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @ApiProperty({ example: '02.02.2002', description: 'Дата изменения' })
  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @OneToMany(() => Event, (event) => event.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Type(() => Event)
  event: Event[];

  @OneToMany(() => Monitor, (monitor) => monitor.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Type(() => Monitor)
  monitors: Monitor[];

  @OneToMany(() => Playlist, (playlist) => playlist.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Type(() => Playlist)
  playlist: Playlist[];

  @OneToMany(() => Content, (content) => content.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Type(() => Content)
  content: Content[];
}
