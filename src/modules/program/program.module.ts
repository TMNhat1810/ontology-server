import { Module } from '@nestjs/common';
import { SparqlHttpModule } from '../http';
import { ProgramController } from './program.controller';
import { ProgramService } from './program.service';
import { SparqlService } from '../sparql/sparql.service';

@Module({
  imports: [SparqlHttpModule],
  controllers: [ProgramController],
  providers: [ProgramService, SparqlService],
})
export class ProgramModule {}
