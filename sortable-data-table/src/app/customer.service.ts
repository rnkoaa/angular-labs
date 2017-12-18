import { CustomerSearchCriteria } from './customer-search-criteria';
import { Injectable } from '@angular/core';
import { Customer } from './customer';


@Injectable()
export class CustomerService {

  private _mockCustomers = <Array<Customer>>[
    { id: '1234', firstname: 'Hanna', lastname: 'Shmidt' },
    { id: '3245', firstname: 'Roberto', lastname: 'Kugar' },
    { id: '6776', firstname: 'Anggel', lastname: 'Solo' },
    { id: '3246', firstname: 'Erstads', lastname: 'Laks' },
    { id: '6758', firstname: 'Sam', lastname: 'Tarrow' }
  ];

  getCustomers(criteria: CustomerSearchCriteria): Customer[] {
    return this._mockCustomers.sort((a, b) => {
      if (criteria.sortDirection === 'desc') {
        if (a[criteria.sortColumn] < b[criteria.sortColumn]) {
          return -1;
        } else if (a[criteria.sortColumn] > b[criteria.sortColumn]) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (a[criteria.sortColumn] > b[criteria.sortColumn]) {
          return -1;
        } else if (a[criteria.sortColumn] < b[criteria.sortColumn]) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  }
}
