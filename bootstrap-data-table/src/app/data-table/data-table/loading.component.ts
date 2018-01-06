import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-loading',
  template: `<div class="loader">Loading...</div>`,
  styleUrls: [`./loading.component.css`]
})
export class LoadingComponent implements OnInit {
  constructor() {

  }

  public ngOnInit(): void {
    // throw new Error('Not implemented yet.');
  }
}
