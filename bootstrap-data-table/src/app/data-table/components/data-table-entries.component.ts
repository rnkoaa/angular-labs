import { ItemsPerPageService } from '../services/items-per-page.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dt-entries',
  template: `
  <div class="float-right">
    <span>Show &nbsp;</span>
    <select name="dt-entries-select" class="form-control input-sm dt-entries" [(ngModel)]="selectedValue">
    <option [value]="5">Please Select</option>
      <option *ngFor="let item of itemsPerPage" [selected]="item" [ngValue]="item">{{item}}</option>
    </select>
    <span>&nbsp; Entries</span>
  </div>`,
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
