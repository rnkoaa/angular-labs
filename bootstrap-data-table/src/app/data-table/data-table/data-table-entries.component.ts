import { ENTRIES_TEMPLATE } from './items-per-page.template';
import { Component } from '@angular/core';

@Component({
  selector: 'app-data-table-entries',
  template: ENTRIES_TEMPLATE,
  styles: [`
  select.dt-entries {
    width: 65px;
    display: inline-block;
  }`]
})
export class DataTableEntriesComponent {

}
