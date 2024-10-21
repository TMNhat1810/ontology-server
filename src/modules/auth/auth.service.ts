import { Injectable, NotFoundException } from '@nestjs/common';
import { SparqlService } from '../sparql/sparql.service';
import { LoginUserDto } from './dto';
import { parseValue } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(private readonly sparql: SparqlService) {}

  async loginUser(loginUserDto: LoginUserDto): Promise<any> {
    const { username, password } = loginUserDto;
    const query = `SELECT DISTINCT ?user ?prop ?data ?role
        WHERE 
        {
            ?user a ?role ; db:username "${username}"^^xsd:string; db:password "${password}" ^^xsd:string.
            ?role rdfs:subClassOf db:User .
            ?user ?prop ?c.
            ?prop rdf:type owl:DatatypeProperty

            FILTER(?prop != rdf:type).
            BIND(STR(?c) as ?data)
        }`;
    const response = await this.sparql.query(query);

    if (response.length === 0) return new NotFoundException();

    const user = { user: '', username: '', password: '', role: '' };
    user.user = parseValue(response[0].user);
    user.role = parseValue(response[0].role);
    response.forEach((item) => {
      user[parseValue(item.prop)] = parseValue(item.data);
    });
    delete user.password;
    return user;
  }
}
