
import { Controller, Get } from '@nestjs/common';
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

  
}
