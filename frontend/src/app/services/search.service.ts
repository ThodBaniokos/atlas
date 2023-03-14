import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchEndpoint: string = 'http://localhost:9000/internships/search/';
  getAllEndpoint: string = 'http://localhost:9000/internships/';

  constructor(private http: HttpClient) { }

  // searches for internships
  searchInternships(search: Map<string, string>) {

    let searchParams: HttpParams = new HttpParams();

    // set skip authorization header
    let headers = new HttpHeaders({ "Skip-Authorization": "true" });

    // add search params to the request
    search.forEach((value, key) => {

      if (value) searchParams = searchParams.set(key, value);
    });

    return this.http.get(this.searchEndpoint, { headers: headers, params: searchParams }).pipe(map((body: any) => {

      // return the body
      return body;
    }));
  }

  // gets all internships
  getAllInternships() {

    let headers = new HttpHeaders({ "Skip-Authorization": "true" });

    return this.http.get(this.getAllEndpoint, { headers: headers }).pipe(map((body: any) => {

      return body;
    }));
  }
}
