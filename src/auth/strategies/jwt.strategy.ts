import { UsersService } from './../../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, JwtPayload } from 'passport-jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JsonWebTokenStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.WEBTOKEN_SECRET_KEY,
    });
  }

  // async validate(payload: any) {
  //   return { userName: payload.userName, id: payload.id };
  // }

  /**
   * Checks if the bearer token is a valid token
   * @param {JwtPayload} jwtPayload validation method for jwt token
   * @param {any} done callback to resolve the request user with
   * @returns {Promise<boolean>} whether or not to validate the jwt token
   */
  async validate({ iat, exp, username }: JwtPayload, done): Promise<boolean> {
    const timeDiff = exp - iat;
    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.getByUsername(username);
    if (!user) {
      throw new UnauthorizedException();
    }

    const newUser = { ...user, roles: [user.role] };

    done(null, newUser);
    return true;
  }
}
