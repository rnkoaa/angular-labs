import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input } from '@angular/core';
import { MODAL_TEMPLATE } from './items-per-page.template';
import { ItemsPerPageService } from './items-per-page.service';

@Component({
  selector: 'app-item-per-page',
  template: MODAL_TEMPLATE,
  styles: [`
    .items-per-page-body {
      padding-bottom: 40px;
    }
  `]
})
export class ItemPerPageComponent {
  @Input() itemsPerPage;

  constructor(public activeModal: NgbActiveModal,
    private itemsPerPageService: ItemsPerPageService) { }

  onSubmit() {
    console.log(`Submitting Form. With Value: ${this.itemsPerPage}`);
    this.activeModal.dismiss('dismiss after submitting.');
    this.itemsPerPageService.itemCountUpdated(this.itemsPerPage);
  }
}
