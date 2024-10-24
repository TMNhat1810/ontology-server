
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProgramService } from './program.service';

@ApiTags('Programs')
@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Get()
  async getAllProgram() {
    return this.programService.getAllProgram();
  }

  @Get('/:name')
  async getAllLecturer(@Param('name') name: string) {
    return this.programService.getProgramHasSubject(name);
  }

  
}
