import { IsEmail, IsString, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'users@mail.ru', description: 'Почта' })
  @IsString({ message: 'Должно быть строкой' })
  @MaxLength(100, { always: true })
  @IsEmail({ require_tld: false }, { message: 'Некорректный email' })
  email: string;

  @ApiProperty({ example: 'Pavel', description: 'Имя' })
  @IsString({ message: 'Должно быть строкой' })
  firstName: string;

  @ApiProperty({ example: 'Dubov', description: 'Фамилия' })
  @IsString({ message: 'Должно быть строкой' })
  lastName: string;

  @ApiProperty()
  @IsString()
  auth0Id: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
