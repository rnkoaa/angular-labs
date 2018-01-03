import { ItemsPerPageService } from './items-per-page.service';
import { ENTRIES_TEMPLATE } from './items-per-page.template';
import { Component, Input } from '@angular/core';

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
  itemsPerPage = [5, 10, 15, 20, 25, 50, 100];
  @Input() defaultValue;
  private _selectedValue: number;


  constructor(private itemsPerPageService: ItemsPerPageService){

  }

  @Input()
  set selectedValue(selectedValue: number) {
    this._selectedValue = selectedValue;
    console.log(`New Selected Value: ${this._selectedValue}`);
    this.itemsPerPageService.itemCountUpdated(this._selectedValue);
  }

  get selectedValue() {
    return this._selectedValue;
  }

}
