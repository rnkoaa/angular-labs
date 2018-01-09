export class RowItem {
  index: number;
  selected: boolean;
  item: any;

  constructor(item: any, index: number, selected = false) {
    this.index = index;
    this.selected = selected;
    this.item = item;
  }
}
