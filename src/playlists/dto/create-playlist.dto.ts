import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsString, MaxLength } from 'class-validator';

export class CreatePlaylistDto {
  @ApiProperty({ example: 'Виды природы', description: 'Название плейлиста' })
  @IsString({ message: 'Должно быть строкой' })
  @MaxLength(100, { always: true })
  name: string;

  @ApiProperty({
    example: 'Плейлист для прохождения сажировки в компанию Purrweb',
    description: 'Описание плейлиста',
  })
  @IsString({ message: 'Должно быть строкой' })
  @MaxLength(100, { always: true })
  body: string;

  @ApiProperty({
    example: '02.02.2022',
    description: 'Дата создания плейлиста',
  })
  @IsString({ message: 'Должно быть датой' })
  createAt: string;

  @ApiProperty({
    example: '02.02.2023',
    description: 'Дата дата изменения плейлиста',
  })
  @ApiProperty({
    example: '02.02.2022',
    description: 'Дата обновления плейлиста',
  })
  @IsString({ message: 'Должно быть датой' })
  updateAt: string;
}
