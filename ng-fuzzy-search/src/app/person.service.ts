
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class PersonService {

  // directorEndpoint = 'https://raw.githubusercontent.com/mattyork/fuzzy/master/examples/directors.json'
  directorEndpoint = 'assets/json/person.json'

  constructor(private http: HttpClient){
  }

  persons() : Observable<Array<Person>>{
    return this.http.get<Array<Person>>(this.directorEndpoint);
  }

}

export interface Person {
  name? : string;
  email? : string;
  jobTitle? : string;
  active: boolean;
  phoneNumber: string;
  date: string
}
