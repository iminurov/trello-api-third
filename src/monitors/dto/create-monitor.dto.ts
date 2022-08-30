import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { Column } from 'typeorm';
import { PartialType } from '@nestjs/mapped-types';

export class CreateMonitorDto {
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор связи с организатором',
  })
  @IsString({ always: true })
  @Column()
  userId: string;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор связи с событием',
  })
  @IsString({ always: true })
  @Column()
  eventId: string;

  @ApiProperty({ example: 'Samsung', description: 'Название экрана' })
  @IsString({ message: 'Должно быть строкой' })
  @MaxLength(100, { always: true })
  name: string;

  @ApiProperty({ example: '02.02.2022', description: 'Дата начала продажи' })
  @IsString({ message: 'Должно быть датой' })
  createAt: string;

  @ApiProperty({ example: '02.02.2023', description: 'Дата продажи' })
  @IsString({ message: 'Должно быть строкой' })
  endDate: string;
}
export class UpdateMonitorDto extends PartialType(CreateMonitorDto) {}
