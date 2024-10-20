import { HttpModule } from '@nestjs/axios';
import { commonAppConfig } from 'src/configs';

export const SparqlHttpModule = HttpModule.register({
  baseURL: commonAppConfig.sparql_endpoint,
  timeout: 300000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});
