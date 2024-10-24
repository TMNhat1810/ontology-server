import { SubjectService } from './subject.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Subjects')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  async getAllSubject() {
    return this.subjectService.getAllSubject();
  }

  @Get('/:typeSubject')
  async getAllLecturer(@Param('typeSubject') name: string) {
    return this.subjectService.getSubjectByName(name);
  }


}
