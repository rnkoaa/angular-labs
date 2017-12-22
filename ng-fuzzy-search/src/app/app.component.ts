import { Component, OnInit } from '@angular/core';
import { PersonService, Person } from "./person.service";
import { FuzzySearchService } from "./fuzzy-search.service";
import { FuseSearchService } from "./fuse-search.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private personService: PersonService,
    private fuzzySearchService: FuzzySearchService,
    private fuseSearchService: FuseSearchService) {

  }
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
    this.personService.persons()
      .subscribe((response: Array<Person>) => {
        // console.log(response);
        const opts = {
          shouldSort: true,
          threshold: 0.1,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 3,
          keys: [
            'name',
            'email',
            'jobTitle'
          ]
        };

        //  const results = this.fuzzySearchService.search("yahoo", response, opts)
        //  console.log(results);
        const result = this.fuseSearchService.search(response, 'yahoo', opts);
        console.log(result);
        //  response.each
      }, err => {
        console.log(err);
      }, () => {
        console.log('completed');
      })
  }
  title = 'app';
}
