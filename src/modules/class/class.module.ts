import { Module } from '@nestjs/common';
import { SparqlHttpModule } from '../http';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { SparqlService } from '../sparql/sparql.service';

@Module({
  imports: [SparqlHttpModule],
  controllers: [ClassController],
  providers: [ClassService,SparqlService],
})
export class ClassModule {}
