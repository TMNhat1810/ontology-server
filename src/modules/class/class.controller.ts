
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClassService } from './class.service';


@ApiTags('Classes')
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get()
  async getAllClass() {
    return this.classService.getAllClass();
  }

  @Get('/:name')
  async getClassByTeacher(@Param('name')name: string){
    return this.classService.getClassByTecher(name);
  }

  
}
