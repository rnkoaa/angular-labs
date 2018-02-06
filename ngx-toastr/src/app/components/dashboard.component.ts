import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../services";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private notificationService: NotificationService) {

  }

  ngOnInit() {

  }

  toast(event) {
    console.log('Toast Clicked');
    this.notificationService.success("Hello World")
  }

}
