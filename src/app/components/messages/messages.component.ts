import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  message: any[]; // Declare a variable to hold the message
  today: string = new Date().toISOString();
  yesterdayDate: Date = new Date();

  constructor(private messagedata: SharedService) { }

  ngOnInit(): void {
    this.yesterdayDate = new Date(this.yesterdayDate.setDate(this.yesterdayDate.getDate() - 1));
    this.messagedata.getfcmtoken.subscribe((message) => {
      this.message = message;
    });
    
  }
}
