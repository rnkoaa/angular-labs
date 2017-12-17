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

  getCustomers() {
    this.customers = this.service.getCustomers();
  }

  ngOnInit() {
    this.getCustomers();
  }
}
