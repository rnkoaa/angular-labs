import { CustomerSearchCriteria } from './customer-search-criteria';
import { CustomerService } from './customer.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from './customer';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  customers: Customer[];

  constructor(private service: CustomerService) { }

  getCustomers(criteria: CustomerSearchCriteria) {
    this.customers = this.service.getCustomers(criteria);
  }

  onSorted($event) {
    this.getCustomers($event);
  }

  ngOnInit() {
    this.getCustomers({ sortColumn: 'id', sortDirection: 'asc' });
  }
}
