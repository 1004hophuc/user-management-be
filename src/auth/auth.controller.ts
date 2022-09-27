import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
// import { ApiBearerAuth, ApiHeader, ApiHeaders } from '@nestjs/swagger';
import { AuthService, ITokenReturnBody } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthenticationGuard } from './guards/auth.guard';
import { LocalAuthGuard } from './guards/local.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization Module')
@Controller('auth')
// @ApiHeader({
//   name: 'Authorization',
//   description: 'A Custom Header',
// })
export class AuthController {
  constructor(private authService: AuthService) {}

  // handle login

  @UseGuards(LocalAuthGuard)
  @Post('/user-login')
  @ApiOperation({ summary: 'Authorization user login' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userName: {
          type: 'string',
          example: 'hophuc1004',
          description: 'This is user has been register',
        },
        password: {
          type: 'string',
          example: '123456abc',
          description: 'This is password of user',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login Success',
  })
  @ApiResponse({
    status: 403,
    description: 'UnAuthorization',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  // async login(@Body() loginDto: LoginDto): Promise<any> {
  //   return {
  //     accessToken: (await this.authService.login(loginDto)).accessToken,
  //   };
  // }
  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, description: 'Login Completed' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() payload: LoginDto): Promise<ITokenReturnBody> {
    const user = await this.authService.authentication(payload);
    delete user.password;

    const token = await this.authService.createToken(user);
    return {
      token,
      user,
    };
  }
}
