import {
  Controller,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Crud, CrudController } from '@nestjsx/crud';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

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
        UseGuards(AuthGuard('jwt')),
        UsePipes(ValidationPipe),
        ApiOperation({ summary: 'Создать пользователя' }),
        ApiResponse({ status: 200, type: CreateUserDto }),
      ],
    },

    getManyBase: {
      decorators: [
        UseGuards(AuthGuard('jwt')),
        ApiResponse({ status: 200, type: CreateUserDto }),
        ApiOperation({ summary: 'Найти пользователя' }),
      ],
    },

    exclude: ['createManyBase', 'updateOneBase'],
    deleteOneBase: {
      // decorators: [UseGuards(UserOwnerGuard)]}
    },
  },
})
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('/users')
export class UsersController implements CrudController<User> {
  constructor(public service: UserService) {}
}
