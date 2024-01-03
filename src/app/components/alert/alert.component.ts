import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  title: string = 'Alert!';
  message: string = '';
  type: string = 'ALERT';
  timeout = 100;
  timer: number = 100; // Adjust this value to set the timeout duration (in seconds)

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.title = data.title;
    this.message = data.message;
    this.type = data.type;
    if (this.data.type === 'idle_alert') {
      this.startTimer();
    }
  }

  ngOnInit(): void {
    if (this.type === 'ALERT_BOX' || this.type === 'SUCCESS_ALERT_BOX') {
      this.dismissTimer();
    }
  }

  close(data: string) {
    this.dialogRef.close(data);
  }

  dismissTimer() {
    if (this.timeout-- > 0) {
      setTimeout(() => {
        this.dismissTimer();
      }, 100);
    } else {
      this.dialogRef.close();
    }
  }

  startTimer() {
    const intervalId = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(intervalId);
        this.dialogRef.close();
      }
    }, 100);
  }
}
