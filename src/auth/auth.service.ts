import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { async } from 'rxjs';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';

import { LoginDto } from './dto/login.dto';

export interface IITokenReturnBody {
  expires: string;
  expiresPrettyPrint: string;
  token: string;
}

export interface ITokenReturnBody {
  token: IITokenReturnBody;
  user: User;
}

@Injectable()
export class AuthService {
  private readonly expiration: string;

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {
    this.expiration = process.env.WEBTOKEN_EXPIRATION_TIME;
  }

  async createToken({
    username,
    name,
    role,
    major,
  }: any): Promise<IITokenReturnBody> {
    return {
      expires: this.expiration,
      expiresPrettyPrint: AuthService.prettyPrintSeconds(this.expiration),
      token: this.jwtService.sign({ username, name, role, major }),
    };
  }

  private static prettyPrintSeconds(time: string): string {
    const ntime = Number(time);
    const hours = Math.floor(ntime / 3600);
    const minutes = Math.floor((ntime % 3600) / 60);
    const seconds = Math.floor((ntime % 3600) % 60);

    return `${hours > 0 ? hours + (hours === 1 ? ' hour,' : ' hours,') : ''} ${
      minutes > 0 ? minutes + (minutes === 1 ? ' minute' : ' minutes') : ''
    } ${seconds > 0 ? seconds + (seconds === 1 ? ' second' : ' seconds') : ''}`;
  }

  //function compare password param with user password in database
  async comparePassword(
    password: string,
    storePasswordHash: string,
  ): Promise<any> {
    console.log(bcrypt);
    return await bcrypt.compare(password, storePasswordHash);
  }

  // async validateUser(payload: LoginDto): Promise<User> {
  //   const user = await this.usersService.getByUsernameAndPass(
  //     payload.userName,
  //     payload.password
  //   )
  //   if(!user) {
  //     throw new UnauthorizedException('Could not authenticate. Please try again')
  //   }
  //   return user
  // }

  async authentication(payload: LoginDto): Promise<any> {
    const user = await this.usersService.getByUsername(payload.userName);
    console.log('user: ', user);

    const check = await this.comparePassword(payload.password, user.password);
    console.log('check: ', check);

    if (!check) {
      throw new BadRequestException('Wrong password!');
    }

    return user;
  }

  // async authenticationSuperAdmin(
  //   userName: string,
  //   password: string,
  // ): Promise<any> {
  //   const superAdmin = await this.usersService.getUserByUsername(userName);

  //   const checkPassword = await this.comparePassword(
  //     password,
  //     superAdmin.password,
  //   );
  // }

  // async login({ userName, password }: LoginDto) {
  //   const user = await this.authentication(userName, password);

  //   const payload = {
  //     userName: user.userName,
  //     id: user.id,
  //     role: user.role,
  //   };

  //   console.log('payload: ', payload);

  //   return { accessToken: this.jwtService.sign(payload) };
  // }
}
