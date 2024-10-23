import { Module } from '@nestjs/common';
import { SparqlHttpModule } from '../http';
import { SubjectController } from './subject.conroller';
import { SubjectService } from './subject.service';
import { SparqlService } from '../sparql/sparql.service';

@Module({
  imports: [SparqlHttpModule],
  controllers: [SubjectController],
  providers: [SubjectService, SparqlService],
})
export class SubjectModule {}
