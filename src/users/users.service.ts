import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { makeUid } from 'src/common/enum';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createRefCode(userName: string) {
    const newUserName = userName.toLowerCase();

    const data = await this.usersRepository.findOne({
      where: {
        userName: newUserName,
      },
    });

    if (data) {
      return data.refCode;
    }

    const newRefCode = makeUid(6) + newUserName.slice(-3, -1);

    while (true) {
      const existRef = await this.usersRepository.findOne({
        where: {
          refCode: newRefCode,
        },
      });

      if (!existRef) {
        break;
      }
    }

    return newRefCode;
  }
}
