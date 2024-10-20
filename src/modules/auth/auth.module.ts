import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SparqlService } from '../sparql/sparql.service';
import { SparqlHttpModule } from '../http';

@Module({
  imports: [SparqlHttpModule],
  controllers: [AuthController],
  providers: [AuthService, SparqlService],
})
export class AuthModule {}
