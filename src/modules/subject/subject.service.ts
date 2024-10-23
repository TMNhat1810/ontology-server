import { Injectable, NotFoundException } from '@nestjs/common';
import { SparqlService } from '../sparql/sparql.service';
import { parseValue } from 'src/utils';

@Injectable()
export class SubjectService {
  constructor(private readonly sparql: SparqlService) {}

  async getAllSubject() {
    const query = `SELECT DISTINCT ?subject ?prop ?data
              WHERE 
              {
                  ?subject a ?type.
                  ?type rdfs:subClassOf db:Subject.
                  ?subject ?prop ?c.
                  ?prop rdf:type owl:DatatypeProperty
      
                  FILTER(?prop != rdf:type).
                  BIND(STR(?c) as ?data)
              }`;
  
    const response = await this.sparql.query(query);
  
    if (response.length === 0) return new NotFoundException();
  
    const subjects = {}; 
  
    response.forEach((item) => {
      let { subject, prop, data } = item;
      subject = parseValue(subject);
      prop = parseValue(prop);
      data = parseValue(data);
  
      const normalizedSubject = subject.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '');
  
      if (!subjects[normalizedSubject]) {
        subjects[normalizedSubject] = { name: subject }; 
      }
      subjects[normalizedSubject][prop] = data;
    });
  
    return Object.values(subjects); 
  }


  async getSubjectByName(name: string){
    const query = `SELECT DISTINCT ?subject ?prop ?data
            WHERE 
            {
                ?subject a db:${name}.
                ?subject?prop ?c.
                ?prop rdf:type owl:DatatypeProperty.
    
                FILTER(?prop != rdf:type).
                BIND(STR(?c) as ?data)
            }`;

    const response = await this.sparql.query(query);
    if (response.length === 0) return new NotFoundException();
    const subjects = {}; 
  
    response.forEach((item) => {
      let { subject, prop, data } = item;
      subject = parseValue(subject);
      prop = parseValue(prop);
      data = parseValue(data);
  
      const normalizedSubject = subject.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '');
  
      if (!subjects[normalizedSubject]) {
        subjects[normalizedSubject] = { name: subject }; 
      }
      subjects[normalizedSubject][prop] = data;
    });
  
    return Object.values(subjects); 
  }

}
