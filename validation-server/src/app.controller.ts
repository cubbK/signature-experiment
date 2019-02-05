import { Get, Controller, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root() {
    return this.appService.root();
  }

  @Post('activate')
  activate(@Body() props) {
    return this.appService.activate(props.license, props.pc);
  }

}
