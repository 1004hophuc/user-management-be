import { RolesGuard } from './../auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';
import { Role } from 'src/auth/roles.decorator';
import { AccountRoles } from 'src/common/enum';

@ApiTags('Users Module')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // @Post('/user-register')
  // @ApiOperation({ summary: 'Register a new user from this api' })
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       userName: {
  //         type: 'string',
  //         example: 'hophuc1004',
  //         description: 'This is unique userName',
  //       },
  //       password: {
  //         type: 'string',
  //         example: '123456abc',
  //         description: 'This is a password of user',
  //       },
  //     },
  //   },
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'New user created',
  // })
  // @ApiResponse({
  //   status: 403,
  //   description: 'Forbidden',
  // })
  // @ApiResponse({
  //   status: 500,
  //   description: 'Internal server error',
  // })
  // async userRegister(@Body() data: any) {
  //   return await this.userService.createUserRegister(data);
  // }

  @Get('/create-ref-code')
  @ApiOperation({ summary: 'Create new refCode' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userName: {
          type: 'string',
          example: 'hophuc1004',
          description: 'This is unique userName',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'New refCode created',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async testRefCode(@Body() data): Promise<any> {
    return await this.userService.createRefCode(data);
  }

  @Post('/company-create-user')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Role(AccountRoles.ADMIN_COMPANY)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUserRegister(
      createUserDto.userName,
      createUserDto.password,
    );
  }

  // @Post('/super-admin-register')
  // async superAdminRegister(@Body() data: any) {
  //   return await this.userService.createSuperAdminRegister(data);
  // }

  // @Post('/admin-register')
  // async adminRegister(@Body() data: any) {
  //   return await this.userService.createAdminRegister(data);
  // }

  // @Post('/admin-company-register')
  // async adminCompanyRegister(@Body() data: any) {
  //   return await this.userService.createAdminCompanyRegister(data);
  // }
}
