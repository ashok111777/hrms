import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-date-picker-dialog',
  templateUrl: './date-picker-dialog.component.html',
  styleUrls: ['./date-picker-dialog.component.scss']
})
export class DatePickerDialogComponent {

  constructor(private dialogRef: MatDialogRef<DatePickerDialogComponent>) { }
  date: any;

  closeDialog(): void {
    this.dialogRef.close();
  }

  get currentDate() {
    var date = new Date().toISOString();
    return date;
  }


  submitDate(): void {


    this.dialogRef.close(this.date);
  }

}
