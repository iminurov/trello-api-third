import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsEmail,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty({
    example: 'Продажа экранов',
    description: 'Название мероприятия',
  })
  @IsString({ message: 'Должно быть строкой' })
  @MaxLength(100, { always: true })
  name: string;

  @ApiProperty({
    example: 'Мероприятие по открытой продаже экранов разной диагонали ',
    description: 'Описание мероприятия',
  })
  @IsString({ message: 'Должно быть строкой' })
  @MaxLength(100, { always: true })
  description: string;

  @ApiProperty({
    example: '01.01.2022',
    description: 'Дата начала мероприятия',
  })
  @IsString({ message: 'Должно быть датой' })
  startDate: string;

  @ApiProperty({
    example: '01.01.2023',
    description: 'Дата окончания мероприятия',
  })
  @IsString({ message: 'Должно быть датой' })
  endDate: string;
}
