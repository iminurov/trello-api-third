import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength } from 'class-validator';
import { Column } from 'typeorm';
import { User } from '../../users/user.entity';
import { PartialType } from '@nestjs/mapped-types';

export class CreateEventDto {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор связи' })
  @IsNumber({ allowNaN: false })
  @Column()
  userId: User['id'];

  @ApiProperty({
    example: 'Продажа экранов',
    description: 'Название мероприятия',
  })
  @IsString()
  @MaxLength(250, { always: true })
  name: string;

  @ApiProperty({
    example: 'Мероприятие по открытой продаже экранов разной диагонали ',
    description: 'Описание мероприятия',
  })
  @IsString()
  @MaxLength(250, { always: true })
  description: string;

  @ApiProperty({
    example: '01.01.2022',
    description: 'Дата начала мероприятия',
  })
  @IsString()
  startDate: string;

  @ApiProperty({
    example: '01.01.2023',
    description: 'Дата окончания мероприятия',
  })
  @IsString()
  endDate: string;
}
export class UpdateEventDto extends PartialType(CreateEventDto) {}
