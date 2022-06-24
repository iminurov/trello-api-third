import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsDate, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DataType, ForeignKey } from 'sequelize-typescript';
import { User } from '../user/user.entity';
import { Type } from 'class-transformer';
import { Monitor } from '../monitors/monitor.entity';

@Entity('Events')
export class Event {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn('uuid')
  id?: number;

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор связи' })
  @IsNumber({ allowNaN: true })
  @Column()
  userId: number;

  @ApiProperty({ example: 'Продажа экранов', description: 'Названия события' })
  @IsString({ always: true })
  @Column()
  name: string;

  @ApiProperty({ example: 'Экраны марки LG', description: 'Описание События' })
  @IsString({ always: true })
  @MaxLength(100, { always: true })
  @Column({ type: 'varchar', length: 100, nullable: false })
  description: string;

  @ApiProperty({ example: '01.01.2021', description: 'Дата начала продаж ' })
  @IsDate({ always: true })
  @Column()
  startDate: string;

  @ApiProperty({ example: '01.01.2021', description: 'Дата окончания продаж' })
  @IsDate({ always: true })
  @Column()
  endDate: string;

  @ApiProperty({ example: '01.01.2021', description: 'Дата создания события' })
  @IsDate({ always: true })
  @Column()
  createAt: string;

  @ApiProperty({
    example: '01.01.2021',
    description: 'Дата обновления события',
  })
  @IsDate({ always: true })
  @Column()
  updateAt: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Monitor, (monitor) => monitor.eventId, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Type(() => Monitor)
  @JoinColumn()
  monitors: Monitor[];

  //   // @OneToMany(() => Monitor, (eventId) => eventId.event)
  //   // @Type(() => Monitor)
  //   // monitors?: Monitor[];
}
