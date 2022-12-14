import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/users/users.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'userName' });
  }

  async validate(userName: string, password: string): Promise<any> {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    const user = await this.authService.authentication(userName, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
