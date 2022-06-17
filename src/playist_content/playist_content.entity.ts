import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsEnum, IsInt, IsString } from 'class-validator';

@Entity()
export class Playist_contentEntity {

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
}
