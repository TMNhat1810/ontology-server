
import { Controller, Get,Param} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MajorService } from './major.service';

@ApiTags('Majors')
@Controller('major')
export class MajorController {
  constructor(private readonly majorService: MajorService) {}

  @Get()
  async getAllMajors() {
    return this.majorService.getAllMajor();
  }

  @Get('/:program')
  async getAllLecturer(@Param('program') name: string) {
    return this.majorService.getMajorHasProgram(name);
  }

  
}
