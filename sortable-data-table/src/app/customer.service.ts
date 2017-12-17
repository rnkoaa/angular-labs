import { Injectable } from '@angular/core';
import { Customer } from './customer';


@Injectable()
export class CustomerService {

  constructor() { }

  getCustomers(): Customer[] {
    return null;
  }

}
