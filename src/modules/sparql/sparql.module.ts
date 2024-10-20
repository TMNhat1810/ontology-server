import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SparqlService } from './sparql.service';

@Module({
  imports: [HttpModule],
  providers: [SparqlService],
  exports: [SparqlService],
})
export class SparqlModule {}
