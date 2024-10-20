import { Module } from '@nestjs/common';
import { SparqlService } from './sparql.service';
import { SparqlHttpModule } from '../http';

@Module({
  imports: [SparqlHttpModule],
  providers: [SparqlService],
  exports: [SparqlService],
})
export class SparqlModule {}
