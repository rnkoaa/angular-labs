import {
  Directive,
  HostListener,
  Input,
  ElementRef,
  Renderer2,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { AppDialogService } from './app-dialog.service';
import { OnInit } from '@angular/core';

@Directive({
  selector: '[appSelectorClick]'
})
export class SelectorClickDirective implements OnInit {
  appSelectorClick: boolean;
  constructor(
    private appDialogService: AppDialogService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.appDialogService.dialogStatus$.subscribe(dialogStatus => {
      console.log(`Received Event: ${dialogStatus}`);
      this.appSelectorClick = dialogStatus;
      console.log(`Current AppSelectorClick Status: ${this.appSelectorClick}`)
    });
  }

  @HostListener('click', ['$event'])
  onClick(target) {
    // console.log(`Current menu status: ${this.appSelectorClick}`);
    // const elementId = this.el.nativeElement.id;
    // const parentNode = this.el.nativeElement.parentNode;
    // const menuElem = parentNode.querySelector(`[aria-labelledby="select-input"]`);
    // console.log(this.appSelectorClick);
    // if (!this.appSelectorClick) {
    //   if (menuElem) {
    //     this.renderer.setStyle(menuElem, 'display', 'block');
    //     this.appDialogService.openDialog();
    //   }
    // } else {
    //   this.renderer.setStyle(menuElem, 'display', 'none');
    //   this.appDialogService.closeDialog();
    // }
  }
}
