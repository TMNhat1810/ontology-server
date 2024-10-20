import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Modules } from './modules';
import { SparqlService } from './modules/sparql/sparql.service';
import { HttpModule } from '@nestjs/axios';
import { commonAppConfig } from './configs';

@Module({
  imports: [
    ...Modules,
    HttpModule.register({
      baseURL: commonAppConfig.sparql_endpoint,
      timeout: 300000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SparqlService],
})
export class AppModule {}
