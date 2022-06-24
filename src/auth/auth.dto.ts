import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  @IsString({ message: 'Должно быть строкой' })
  @MaxLength(100, { always: true })
  @IsEmail({ require_tld: false }, { message: 'Некорректный email' })
  email: string;

  @ApiProperty({ example: '123456', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'не меньше 4 и не больше 16' })
  password: string;

  @ApiProperty({ example: 'Artem', description: 'Имя' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Gabatov', description: 'Фамилия' })
  @IsString({ always: true })
  lastName: string;
}
