import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Users Module')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/user-register')
  @ApiOperation({ summary: 'Register a new user from this api' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userName: {
          type: 'string',
          example: 'hophuc1004',
          description: 'This is unique userName',
        },
        password: {
          type: 'string',
          example: '123456abc',
          description: 'This is a password of user',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'New user created',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async userRegister(@Body() data: any) {
    return await this.userService.createUserRegister(data);
  }

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
}
