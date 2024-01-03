import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-joing-card',
  templateUrl: './new-joing-card.component.html',
  styleUrls: ['./new-joing-card.component.scss']
})
export class NewJoingCardComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NewJoingCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  ngOnInit(): void {}

  close(data: any) {
    this.dialogRef.close({ data: data });
  }
}
