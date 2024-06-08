import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() //main route
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() //child route
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("hi")
  getHi(): string {
    return this.appService.getHi();
  }
}
