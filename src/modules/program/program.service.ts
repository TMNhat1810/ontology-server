import { Injectable, NotFoundException } from '@nestjs/common';
import { SparqlService } from '../sparql/sparql.service';
import { parseValue } from 'src/utils';

@Injectable()
export class ProgramService {
  constructor(private readonly sparql: SparqlService) {}

  async getAllProgram() {
    const query = `SELECT DISTINCT ?program ?prop ?data
            WHERE 
            {
                ?program a db:Program.
                ?program?prop ?c.
                ?prop rdf:type owl:DatatypeProperty.
    
                FILTER(?prop != rdf:type).
                BIND(STR(?c) as ?data)
            }`;
  
    const response = await this.sparql.query(query);
  
    if (response.length === 0) return new NotFoundException();
  
    const programs = {}; 
  
    response.forEach((item) => {
      let { program, prop, data } = item;
      program = parseValue(program);
      prop = parseValue(prop);
      data = parseValue(data);
  
      const normalizedProgram = program.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '');
  
      if (!programs[normalizedProgram]) {
        programs[normalizedProgram] = { name: program }; 
      }
      programs[normalizedProgram][prop] = data;
    });
  
    return Object.values(programs); 
  }


  

}
