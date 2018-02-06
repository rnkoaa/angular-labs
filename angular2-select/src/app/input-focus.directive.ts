import { Directive, HostListener, ViewChild, Input, ElementRef, Renderer2 } from '@angular/core';
import { AppDialogService } from './app-dialog.service';
import { OnInit } from '@angular/core';

@Directive({
  selector: '[appInputFocus]'
})
export class InputFocusDirective implements OnInit {
  appInputFocus: boolean;
  constructor(
    private appDialogService: AppDialogService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.appDialogService.dialogStatus$.subscribe(dialogStatus => {
      console.log(`Received Event: ${dialogStatus}`);
      this.appInputFocus = dialogStatus;
    });
  }

  @HostListener('click', ['$event'])
  onClick(target) {
    const elementId = this.el.nativeElement.id;
    const parentNode = this.el.nativeElement.parentNode;
    const menuElem = parentNode.querySelector(`[aria-labelledby="select-input"]`);
    // if (!this.appInputFocus) {
    //   if (menuElem) {
    //     this.renderer.setStyle(menuElem, 'display', 'block');
    //     this.renderer.addClass(parentNode, 'select-open');
    //     this.appDialogService.openDialog();
    //   }
    // } else {
    //   this.renderer.setStyle(menuElem, 'display', 'none');
    //   this.renderer.removeClass(parentNode, 'select-open');
    //   this.appDialogService.closeDialog();
    // }
  }

  // @HostListener('blur', ['$event'])
  // onBlur(target) {
  //   this.appInputFocus = !this.appInputFocus;
  //   const elementId = this.el.nativeElement.id;
  //   const parentNode = this.el.nativeElement.parentNode;
  //   const menuElem = parentNode.querySelector(`[aria-labelledby="select-input"]`);
  //   if (!this.appInputFocus) {
  //     this.renderer.setStyle(menuElem, 'display', 'none');
  //     this.appDialogService.closeDialog();
  //   }
  // }
}
