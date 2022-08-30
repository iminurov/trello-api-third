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
import { IsDate, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { Type } from 'class-transformer';
import { Monitor } from '../monitors/monitor.entity';

@Entity('Events')
export class Event {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '1', description: 'Идентификатор пользователя' })
  @IsNumber({ allowNaN: false })
  @Column()
  userId: User['id'];

  @ApiProperty({ example: 'Продажа экранов', description: 'Названия события' })
  @IsString({ always: false })
  @Column()
  name: string;

  @ApiProperty({ example: 'Экраны марки LG', description: 'Описание События' })
  @IsString({ always: false })
  @MaxLength(100, { always: false })
  @Column({ type: 'varchar', length: 100, nullable: true })
  description: string;

  @ApiProperty({ example: '01.01.2021', description: 'Дата начала продаж ' })
  @IsDate({ always: false })
  @Column({ nullable: true })
  startDate: string;

  @ApiProperty({ example: '01.01.2021', description: 'Дата окончания продаж' })
  @IsDate({ always: false })
  @Column({ nullable: true })
  endDate: string;

  @ApiProperty({ example: '01.01.2021', description: 'Дата создания события' })
  @IsDate({ always: false })
  @CreateDateColumn({ type: 'timestamptz' })
  createAt: string;

  @ApiProperty({
    example: '01.01.2021',
    description: 'Дата обновления события',
  })
  @IsDate({ always: false })
  @UpdateDateColumn({ type: 'timestamptz' })
  updateAt: string;

  @ManyToOne(() => User, (user) => user.event, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => Monitor, (monitor) => monitor.event, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Type(() => Monitor)
  @JoinColumn()
  monitors: Monitor[];
}
