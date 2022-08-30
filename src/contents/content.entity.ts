import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PlaylistContentTable } from './RelationPlaylistContent';
import { User } from '../users/user.entity';
import { FileTypes } from './types/types';
import { IsNumber } from 'class-validator';

@Entity('content')
export class Content {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: true })
  title: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: FileTypes,
    nullable: true,
  })
  fileType: FileTypes | null;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  key: string;

  @ApiProperty({ example: '1', description: 'Идентификатор пользователя' })
  @IsNumber({ allowNaN: false })
  @Column()
  userId: User['id'];

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор плейлиста',
  })
  @Column({
    nullable: true,
  })
  playlistId: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createAt: string;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updateAt: string;

  @ManyToOne(() => User, (user) => user.content, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @OneToMany(
    () => PlaylistContentTable,
    (PlaylistContentTable) => PlaylistContentTable.content,
  )
  PlaylistContent: PlaylistContentTable[];
}
