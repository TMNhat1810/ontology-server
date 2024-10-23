import { Injectable, NotFoundException } from '@nestjs/common';
import { SparqlService } from '../sparql/sparql.service';
import { parseValue } from 'src/utils';

@Injectable()
export class ClassService {
  constructor(private readonly sparql: SparqlService) {}

  async getAllClass() {
    const query = `SELECT DISTINCT ?cl ?prop ?data
                      WHERE 
                      {
                          ?cl a db:Class.
                          ?cl?prop ?c.
                          ?prop rdf:type owl:DatatypeProperty.
  
                          FILTER(?prop != rdf:type).
                          BIND(STR(?c) as ?data)
                        }`;
  
    const response = await this.sparql.query(query);
  
    if (response.length === 0) return new NotFoundException();
  
    const classes = {}; 
  
    response.forEach((item) => {
      let { cl, prop, data } = item;
      cl = parseValue(cl);
      prop = parseValue(prop);
      data = parseValue(data);
  
      const normalizedProgram = cl.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '');
  
      if (!classes[normalizedProgram]) {
        classes[normalizedProgram] = { name: cl }; 
      }
      classes[normalizedProgram][prop] = data;
    });
  
    return Object.values(classes); 
  }

  async getClassByTecher(name: string) {
    const query = `SELECT DISTINCT ?cl ?prop ?data
                    WHERE 
                    {
                      db:${name} db:teaches ?cl.	
                      ?cl ?prop ?c.
                      filter(?prop != rdf:type).
                      bind(STR(?c) as ?data)
                    }`;
  
    const response = await this.sparql.query(query);
  
    if (response.length === 0) return new NotFoundException();
  
    const classes = {}; 
  
    response.forEach((item) => {
      let { cl, prop, data } = item;
      cl = parseValue(cl);
      prop = parseValue(prop);
      data = parseValue(data);
  
      const normalizedProgram = cl.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '');
  
      if (!classes[normalizedProgram]) {
        classes[normalizedProgram] = { name: cl }; 
      }
      classes[normalizedProgram][prop] = data;
    });
  
    return Object.values(classes); 
  }




  

}
