import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  TableForeignKey,
} from 'typeorm';
import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PlaylistContentTable } from '../playist_content/RelationPlaylistContent';
import { User } from '../user/user.entity';

@Entity('Content')
export class Content {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор связи с плейлистом',
  })
  @IsString({ always: true })
  @Column()
  playlistId: string;

  @ApiProperty({ example: '', description: 'Тип (формат) файла' })
  @IsEnum({ always: true })
  @Column()
  fileType: string;

  @ApiProperty({ example: 'Виды Аяски', description: 'Название файла' })
  @IsString({ always: true })
  @Column()
  name: string;

  @ApiProperty({ example: '', description: 'Ключ' })
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  @IsString({ always: true })
  key: string;

  @ApiProperty({ example: '01.01.2021', description: 'Дата создания контента' })
  @IsString({ always: true })
  @Column()
  createAt: string;

  @ApiProperty({
    example: '01.01.2021',
    description: 'Дата изменения плейлиста',
  })
  @IsString({ always: true })
  @Column()
  updateAt: string;

  @IsString({ always: true })
  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @OneToMany(
    () => PlaylistContentTable,
    (PlaylistContentTable) => PlaylistContentTable.contentId,
  )
  PlaylistContent: PlaylistContentTable[];
}
