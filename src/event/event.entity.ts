import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsDate, IsString, MaxLength } from "class-validator";
import { UserEntity } from "../user/user.entity";
import { Type } from "class-transformer";
import { MonitorEntity } from "../monitors/monitor.entity";


@Entity()
  export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;


  @IsString({ always: true })
  @Column()
  userId: string;

  @IsString({ always: true })
  @Column()
  name: string;

  @IsString({ always: true })
  @MaxLength(100, { always: true })
  @Column({ type: 'varchar', length: 100, nullable: false })
  description: string;

  @IsDate({ always: true })
  @Column()
  startDate: string;

  @IsDate({ always: true })
  @Column()
  endDate: string;

  @IsDate({ always: true })
  @Column()
  createAt: string;

  @IsDate({ always: true })
  @Column()
  updateAt: string;


  @ManyToOne(() => UserEntity, (users) => users.events, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
      user: UserEntity;
}