import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from '@nestjs/swagger';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo) {
    super(repo);
  }

  async create(dto: CreateUserDto) {
    const user = this.repo.create(dto);
    await this.repo.save(user);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.repo.findOne({ where: { email } });
    return user;
  }
}
//посомтреть тут
