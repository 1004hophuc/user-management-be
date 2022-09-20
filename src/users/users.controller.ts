import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/user-register')
  async userRegister(@Body() createUserDto: CreateUserDto) {
    const { userName, password, refCode } = createUserDto;

    const hashedPassword = 0;
  }

  @Get('/test-ref-code')
  async testRefCode(@Param() userName: string) {
    return await this.userService.createRefCode(userName);
  }
}
