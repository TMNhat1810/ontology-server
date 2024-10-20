import { AuthModule } from './auth/auth.module';
import { ClassModule } from './class/class.module';
import { SparqlHttpModule } from './http';
import { MajorModule } from './major/major.module';
import { ProgramModule } from './program/program.module';
import { SparqlModule } from './sparql/sparql.module';
import { SubjectModule } from './subject/subject.module';
import { UserModule } from './user/user.module';

export const Modules = [
  SparqlHttpModule,
  SparqlModule,
  UserModule,
  ClassModule,
  ProgramModule,
  SubjectModule,
  MajorModule,
  AuthModule,
];
