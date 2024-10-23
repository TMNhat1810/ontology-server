import { Module } from '@nestjs/common';
import { SparqlHttpModule } from '../http';
import { MajorController } from './major.controller';
import { MajorService } from './major.service';
import { SparqlService } from '../sparql/sparql.service';

@Module({
  imports: [SparqlHttpModule],
  controllers: [MajorController],
  providers: [MajorService,SparqlService],
})
export class MajorModule {}
