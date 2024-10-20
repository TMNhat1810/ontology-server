import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SparqlService {
  constructor(private readonly httpService: HttpService) {}

  private readonly prefix: string =
    'PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\nPREFIX owl: <http://www.w3.org/2002/07/owl#>\nPREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX db: <http://www.semanticweb.org/minhn/ontologies/2024/9/uni/>\n';

  async query(query: string): Promise<any> {
    try {
      const response = await lastValueFrom(
        this.httpService.post('', {
          query: this.prefix + query,
        }),
      );

      return response.data.results.bindings;
    } catch (error) {
      throw new Error(`SPARQL query failed: ${error.message}`);
    }
  }
}
