import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsDate, IsString, MaxLength } from "class-validator";

@Entity()
export class PlaylistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString({ always: true })
  @Column()
  userId: string;

  @IsString({ always: true })
  @Column()
  monitorsId: string;

  @IsString({ always: true })
  @Column()
  name: string;

  @IsString({ always: true })
  @MaxLength(100, { always: true })
  @Column()
  body: string;

  @IsDate({ always: true })
  @Column()
  createAt: string;

  @IsDate({ always: true })
  @Column()
  updateAt: string;
}