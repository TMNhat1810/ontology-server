import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Modules } from './modules';
import { SparqlService } from './modules/sparql/sparql.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [...Modules],
  controllers: [AppController],
  providers: [AppService, SparqlService],
  exports: [HttpModule],
})
export class AppModule {}
