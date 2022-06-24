import {
  Controller,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest,
} from '@nestjsx/crud';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { Type } from 'class-transformer';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
// import { JwtAuthGuard } from "../auth/auth.jwt/jwt-auth.guard";

@Crud({
  model: {
    type: User,
  },
  dto: {
    create: CreateUserDto,
    update: UpdateUserDto,
  },
  // в routes прописываются Guards и Api-шки
  routes: {
    createOneBase: {
      decorators: [
        // UseGuards(AuthGuard('jwt')),
        UsePipes(ValidationPipe),
        ApiOperation({ summary: 'Создать пользователя' }),
        ApiResponse({ status: 200, type: CreateUserDto }),
      ],
    },

    getManyBase: {
      decorators: [
        Roles('SALLER'),
        // UseGuards(RolesGuard),
        // UseGuards(JwtAuthGuard),
        ApiResponse({ status: 200, type: [User] }),
        ApiOperation({ summary: 'Найти пользователя' }),
      ],
    },
    //Исключил некоторые
    exclude: ['createManyBase', 'updateOneBase'],
    //   deleteOneBase: {
    //     // decorators: [UseGuards(UserOwnerGuard)]}
    // }
  },
})
@ApiTags('Пользователи')
// @UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UserService) {}

  get base(): CrudController<User> {
    return this;
  }
}
