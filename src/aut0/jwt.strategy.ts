import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

export const AUTH0_DOMAIN = 'minurovi.eu.auth0.com';
export const AUTH0_CLIENT_ID = 'HD1gS3So7NApALlaR4pGRewmMV1dgBKT';
export const AUTH0_CLIENT_SECRET =
  'TYDBco1DfAq9hVH4Qv6LP640eeU4aV_vaZ45bgnDgtOs6lErJlyenel-0iJcV1Sq';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: 'trello-api',
      issuer: `https://${AUTH0_DOMAIN}/`,
    });
  }

  validate(payload: any, done: VerifiedCallback) {
    if (!payload) {
      done(new UnauthorizedException(), false);
    }

    return done(null, payload);
  }
}
