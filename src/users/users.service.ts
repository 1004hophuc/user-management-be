import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRoles, makeUid } from 'src/common/enum';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne({
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }) {
    return await this.usersRepository.findOne({
      where: { userName, password },
    });
  }

  async getByUsernameAndPass(
    userName: string,
    password: string,
  ): Promise<User> {
    return await this.usersRepository.findOne({
      where: { userName, password },
    });
  }

  async getUserByUsername(userName: string) {
    const staff = await this.usersRepository.findOne({
      where: { userName },
    });

    if (!staff) throw new BadRequestException('Username not found!');

    return staff;
  }

  async createRefCode({ userName }: { userName: string }) {
    const data = await this.usersRepository.findOne({
      where: { userName: userName },
    });

    console.log('data: ', data);
    const newUserName = userName.toLowerCase();

    // if (data) {
    //   return data.refCode;
    // }

    const newRefCode = makeUid(6) + newUserName.slice(-3, -1);

    console.log('refCode: ', newRefCode);

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
    console.log('newRefCode: ', newRefCode);

    return newRefCode;
  }

  async createUserRegister({ userName, password }: any): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = this.usersRepository.create({
      userName,
      password: hashedPassword,
    });
    return await this.usersRepository.save(data);
  }

  // async createSuperAdminRegister({
  //   userName,
  //   password,
  //   role,
  // }: {
  //   userName: string;
  //   password: string;
  //   role: AccountRoles;
  // }): Promise<User> {
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   role = AccountRoles.SUPPER_ADMIN;
  //   const data = this.usersRepository.create({
  //     userName,
  //     password: hashedPassword,
  //     role,
  //   });
  //   return await this.usersRepository.save(data);
  // }

  // async createAdminRegister({
  //   userName,
  //   password,
  // }: {
  //   userName: string;
  //   password: string;
  // }): Promise<User> {
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const role = AccountRoles.ADMIN;
  //   const data = this.usersRepository.create({
  //     userName,
  //     password: hashedPassword,
  //     role,
  //   });
  //   return await this.usersRepository.save(data);
  // }

  // async createAdminCompanyRegister({
  //   userName,
  //   password,
  // }: {
  //   userName: string;
  //   password: string;
  // }): Promise<User> {
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const role = AccountRoles.ADMIN_COMPANY;
  //   const refCode = await this.createRefCode({ userName });
  //   const data = this.usersRepository.create({
  //     userName,
  //     password: hashedPassword,
  //     role,
  //     refCode,
  //   });
  //   return await this.usersRepository.save(data);
  // }
}
