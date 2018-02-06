import { Component, Input } from '@angular/core';
import { AppDialogService } from './app-dialog.service';
import { OnInit, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ViewChild } from '@angular/core/src/metadata/di';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';
  // @ViewChild('myDrop') private dropdown: NgbDropdown;

  private _menuOpen = false;

  status: { isopen: boolean } = { isopen: false };

  toggleDropdown($event: MouseEvent): void {
    // $event.preventDefault();
    // $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  change(value: boolean): void {
    this.status.isopen = value;
  }

  constructor(private appDialogService: AppDialogService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // this.appDialogService.dialogStatus$.subscribe(dialogStatus => {
    //   switch (dialogStatus) {
    //     case 'close':
    //       this.status.isopen = false;
    //       break;
    //     case 'open':
    //     default:
    //       this.status.isopen = true;
    //   }
    // });
  }
}
