import { Module } from '@nestjs/common';
import { SparqlHttpModule } from '../http';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SparqlService } from '../sparql/sparql.service';

@Module({
  imports: [SparqlHttpModule],
  controllers: [UserController],
  providers: [UserService, SparqlService],
})
export class UserModule {}
