import { Controller, UseGuards } from "@nestjs/common";
import { UserService } from './user.service';
import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from "@nestjsx/crud";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserEntity } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from "../auth/auth.jwt/jwt-auth.guard";


@Crud({
  model: {
    type: UserEntity,
  },
  // в роутах прописываются Guards и Api-шки
  routes: {
    createOneBase: {
      decorators: [
        UseGuards(AuthGuard('jwt')),
        ApiOperation({ summary: 'Создать пользователя' }),
      ],
    },

    getManyBase: {
      decorators: [
        UseGuards(JwtAuthGuard),
        ApiOperation({ summary: 'Найти пользователя' }),
      ],
    },
    exclude: [],
  }
})
@ApiTags('Users')
@UseGuards(AuthGuard('jwt')) //
@Controller('users')
export class UsersController implements CrudController<UserEntity> {
  constructor(public service: UserService) {}

  get base(): CrudController<UserEntity> {
    return this;
  }

}
