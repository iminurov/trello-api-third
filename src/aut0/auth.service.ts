import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import axios from 'axios';
import { AUTH0_DOMAIN } from './jwt.strategy';

import { UserInfoOAuth } from './user-info-oauth.interface';
import { OAuthUserDataToEntityUser } from './index';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    readonly userRepository: Repository<User>,
  ) {}

  async loginUser(code: string) {
    try {
      const res = await axios.post(
        'https://minurovi.eu.auth0.com/oauth/token',
        {
          grant_type: 'authorization_code',
          client_id: 'HD1gS3So7NApALlaR4pGRewmMV1dgBKT',
          client_secret:
            'TYDBco1DfAq9hVH4Qv6LP640eeU4aV_vaZ45bgnDgtOs6lErJlyenel-0iJcV1Sq',
          code: code,
          redirect_uri: 'http://localhost:3003/api/auth0/login',
        },
      );

      const { access_token: accessToken } = res.data;
      const userInfo = await this.getInfoUser(accessToken);
      const user = await this.findOrCreate(OAuthUserDataToEntityUser(userInfo));
      return { tokens: res.data, user: user };
    } catch (error) {
      throw error;
    }
  }

  async getInfoUser(token: string): Promise<UserInfoOAuth> {
    try {
      const userInfo = await (
        await axios.get<UserInfoOAuth>(`https://${AUTH0_DOMAIN}/userinfo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data;
      return userInfo;
    } catch (error) {
      throw new BadGatewayException();
    }
  }

  async findOrCreate(userData: CreateUserDto): Promise<User> {
    const user = await this.getUserByEmail(userData.email);
    if (user) {
      return user;
    }
    return this.createUser(userData);
  }

  async createUser(user: CreateUserDto): Promise<User> {
    try {
      return this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
}
