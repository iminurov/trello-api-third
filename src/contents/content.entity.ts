import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsDate, IsEnum, IsString, MaxLength } from "class-validator";
import { User, UserEntity } from "../user/user.entity";

@Entity()
export class ContentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString({ always: true })
  @Column()
  playlistId: string;

  @IsEnum({ always: true })
  @Column()
  fileType: string;

  @IsString({ always: true })
  @Column()
  name: string;


  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  key: string;

  @IsDate({ always: true })
  @Column()
  createAt: string;

  @IsDate({ always: true })
  @Column()
  updateAt: string;

  @ManyToOne(() => UserEntity, (users) => users.contents, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  public user: UserEntity;
}
