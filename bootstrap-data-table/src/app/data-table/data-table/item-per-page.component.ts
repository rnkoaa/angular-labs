import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input } from '@angular/core';
import { MODAL_TEMPLATE } from './items-per-page.template';

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
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}
