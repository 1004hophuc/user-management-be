import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  //function compare password param with user password in database
  async comparePassword(
    password: string,
    storePasswordHash: string,
  ): Promise<any> {
    console.log(bcrypt);
    return await bcrypt.compare(password, storePasswordHash);
  }

  async authentication(userName: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByUsername(userName);

    const check = await this.comparePassword(password, user.password);
    console.log('check: ', check);

    if (!check) {
      throw new BadRequestException('Wrong password!');
    }

    return user;
  }

  async login({ userName, password }: LoginDto) {
    const staff = await this.authentication(userName, password);

    const payload = {
      userName: staff.username,
      id: staff.id,
    };

    return { accessToken: this.jwtService.sign(payload) };
  }
}
