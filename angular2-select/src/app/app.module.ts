import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { SelectorClickDirective } from './selector-click.directive';
import { InputFocusDirective } from './input-focus.directive';
import { AppDialogService } from './app-dialog.service';

@NgModule({
  declarations: [AppComponent, SelectorClickDirective, InputFocusDirective],
  imports: [BrowserModule, BsDropdownModule.forRoot()],
  providers: [AppDialogService],
  bootstrap: [AppComponent]
})
export class AppModule {}
