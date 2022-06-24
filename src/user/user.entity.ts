import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  classToPlain,
  Exclude,
  plainToInstance,
  Type,
} from 'class-transformer';
import { DataType, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Event } from '../event/event.entity';
import { Content } from '../contents/content.entity';

// interface UserCreationAttrs {
//   email: string;
//   password: string;
// }

@Entity('/Users')
export class User {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '01.01.2001', description: 'Дата создания' })
  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @ApiProperty({ example: '02.02.2002', description: 'Дата изменения' })
  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @ApiProperty({ example: 'minurovi@gmail.com', description: 'Почтовый ящик' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '0000', description: 'Пароль' })
  // @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  password: string;

  @ApiProperty({ example: 'Илья', description: 'Имя пользователя' })
  @Column({})
  firstName: string;

  @ApiProperty({ example: 'Крауз', description: 'Фамилия пользоваеля' })
  @Column({ nullable: true })
  lastName: string;

  @OneToMany(() => Event, (event) => event.userId, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Type(() => Event)
  @JoinColumn()
  event: Event[];

  @OneToMany(() => Content, (content) => content.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Type(() => Content)
  @JoinColumn()
  content: Content[];
}
