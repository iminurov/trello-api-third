import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, Length, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateContentDto {
  @ApiProperty({
    example: 'https://www.google.com',
    description: 'Ссылка на файл',
  })
  @MaxLength(100, { always: true })
  @IsUrl({}, { message: 'Должно быть ссылкой' })
  url: string;

  @ApiProperty({ example: 'Звуки природ', description: 'Название файла' })
  @IsString({ message: 'Должно быть строкой' })
  name: string;

  @IsString({ message: 'Должно быть строкой' })
  lastName: string;
}
