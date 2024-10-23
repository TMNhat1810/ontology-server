import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/student')
  async getAllStudent() {
    return this.userService.getAllStudent();
  }

  @Get('/lecturer')
  async getAllLecturer() {
    return this.userService.getAllLecturer();
  }

  @Get('/class/:name')
  async getStudentHasClass(@Param('name')name: string) {
    return this.userService.getStudentHasClass(name);
  }
}
