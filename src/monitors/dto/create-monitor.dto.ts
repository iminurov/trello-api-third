import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsString, MaxLength } from 'class-validator';

export class CreateMonitorDto {
  @ApiProperty({ example: 'Samsung', description: 'Название экрана' })
  @IsString({ message: 'Должно быть строкой' })
  @MaxLength(100, { always: true })
  name: string;

  @ApiProperty({ example: '02.02.2022', description: 'Дата начала продажи' })
  @IsDate({ message: 'Должно быть датой' })
  createAt: string;

  @ApiProperty({ example: '02.02.2023', description: 'Дата продажи' })
  @IsString({ message: 'Должно быть строкой' })
  endDate: string;
}
