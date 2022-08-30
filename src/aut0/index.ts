import { UserInfoOAuth } from './user-info-oauth.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';

export const OAuthUserDataToEntityUser = (
  user: UserInfoOAuth,
): CreateUserDto => {
  return {
    firstName: user.given_name || null,
    lastName: user.family_name || null,
    email: user.email,
    auth0Id: user.sub,
  };
};
