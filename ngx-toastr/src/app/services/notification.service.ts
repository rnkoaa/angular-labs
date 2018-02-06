import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class NotificationService {

  constructor(private toastr: ToastrService) {
  }

  success(message?: string) {
     this.toastr.success(message);
  };

  error(message?: string) {
       this.toastr.error(message);
  };

  info(message?: string) {
       this.toastr.info(message);
  };

  warning(message) {
       this.toastr.warning(message);
  };



}
