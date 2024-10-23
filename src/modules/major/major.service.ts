import { Injectable, NotFoundException } from '@nestjs/common';
import { SparqlService } from '../sparql/sparql.service';
import { parseValue } from 'src/utils';

@Injectable()
export class MajorService {
  constructor(private readonly sparql: SparqlService) {}

  async getAllMajor() {
    const query = `SELECT DISTINCT ?major ?prop ?data
                      WHERE 
                      {
                          ?major a db:Major.
                          ?major?prop ?c.
                          ?prop rdf:type owl:DatatypeProperty.
  
                          FILTER(?prop != rdf:type).
                          BIND(STR(?c) as ?data)
                      }`;

    const response = await this.sparql.query(query);

    if (response.length === 0) return new NotFoundException();

    const majors = {};

    response.forEach((item) => {
      let { major, prop, data } = item;
      major = parseValue(major);
      prop = parseValue(prop);
      data = parseValue(data);

      const normalizedProgram = major.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '');

      if (!majors[normalizedProgram]) {
        majors[normalizedProgram] = { name: major };
      }
      majors[normalizedProgram][prop] = data;
    });

    return Object.values(majors);
  }
}
