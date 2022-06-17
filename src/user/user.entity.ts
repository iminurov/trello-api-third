import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { classToPlain, Exclude, plainToInstance, Type } from "class-transformer";
import * as events from "events";
import * as Events from "events";
import { EventEntity } from "../event/event.entity";
import { MonitorEntity } from "../monitors/monitor.entity";
import { ContentEntity } from "../contents/content.entity";

@Entity()
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: string;


  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @Column({ unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true})
  password: string;

  @Column({ unique: true})
  username: string;

  @Column({ nullable: true})
  lastname: string;

  @OneToMany(() => EventEntity, (userId) => userId.user)
  @Type(() => EventEntity)
  @JoinColumn()
  events?: EventEntity[];

  @OneToMany(() => ContentEntity, (content) => content.user)
  @Type(() => EventEntity)
  @JoinColumn()
  contents?: ContentEntity[];

  // toJSON() {
  //   return plainToInstance(this); //что возвращается  в файле что?
  // }
}

export class User{}