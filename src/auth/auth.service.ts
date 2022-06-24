import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { contains } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/user.entity';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { annotateModelWithIndex } from 'sequelize-typescript';
import { AuthDto } from './auth.dto';
import { ExceptionHandler } from '@nestjs/core/errors/exception-handler';
import e from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  //Вход
  async login(userDto: AuthDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }
  // Валидация (проверка наличия польователя)
  private async validateUser(userDto: AuthDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) throw new Error();
    console.log(Error);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некоректный емейл или пароль ',
    });
  }
  //Регистрация
  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser(hashPassword);

    return this.generateToken(user);
  }
  // Генерация Токена

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
