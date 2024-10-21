import { Injectable, NotFoundException } from '@nestjs/common';
import { SparqlService } from '../sparql/sparql.service';
import { parseValue } from 'src/utils';

@Injectable()
export class UserService {
  constructor(private readonly sparql: SparqlService) {}

  async getAllStudent() {
    const query = `SELECT DISTINCT ?user ?prop ?data
            WHERE 
            {
                ?user a db:Student.
                ?user ?prop ?c.
                ?prop rdf:type owl:DatatypeProperty
    
                FILTER(?prop != rdf:type).
                BIND(STR(?c) as ?data)
            }`;

    const response = await this.sparql.query(query);

    if (response.length === 0) return new NotFoundException();
    const users = [];

    response.forEach((item) => {
      let { user, prop, data } = item;
      user = parseValue(user);
      prop = parseValue(prop);
      data = parseValue(data);

      let entry = users.find((u) => u.name === user);

      if (!entry) {
        entry = { name: user };
        users.push(entry);
      }
      entry[prop] = data;
    });

    return users.map((user) => {
      delete user.password;
      return user;
    });
  }

  async getAllLecturer() {
    const query = `SELECT DISTINCT ?user ?prop ?data
            WHERE 
            {
                ?user a db:Lecturer.
                ?user ?prop ?c.
                ?prop rdf:type owl:DatatypeProperty
    
                FILTER(?prop != rdf:type).
                BIND(STR(?c) as ?data)
            }`;

    const response = await this.sparql.query(query);

    if (response.length === 0) return new NotFoundException();
    const users = [];

    response.forEach((item) => {
      let { user, prop, data } = item;
      user = parseValue(user);
      prop = parseValue(prop);
      data = parseValue(data);

      let entry = users.find((u) => u.name === user);

      if (!entry) {
        entry = { name: user };
        users.push(entry);
      }
      entry[prop] = data;
    });

    return users.map((user) => {
      delete user.password;
      return user;
    });
  }
}
