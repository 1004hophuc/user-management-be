import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('/login')
  // login(@Body() data: any) {
  //   console.log('hello: ', data);
  //   return data.user;
  // }
}
