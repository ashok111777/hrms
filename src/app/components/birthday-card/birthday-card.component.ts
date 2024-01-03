import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-birthday-card',
  templateUrl: './birthday-card.component.html',
  styleUrls: ['./birthday-card.component.scss']
})
export class BirthdayCardComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BirthdayCardComponent>,
    @Inject(MAT_DIALOG_DATA) public empDetail: any,
    public restApi: RestService,
  ) {
  }

  ngOnInit(): void { }

  close(data: any) {
    this.dialogRef.close({ data: data });
  }
}
