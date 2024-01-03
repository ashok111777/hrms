import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.scss']
})
export class TrainingDetailsComponent {
  dataSource: MatTableDataSource<any>;
  empDetails: any;
  trainingDetails: any = [];
  tableHeaders: any = ['product', 'assignDate', 'trainer', 'status'];
  constructor(
    public dialogRef: MatDialogRef<TrainingDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empDetails = data;
    this.trainingDetails = data.trainingDetails;
    this.dialogRef.disableClose = true;
    setTimeout(() => {
      this.initDetails(this.trainingDetails);
    }, 100);
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
 
  }
  close(data:any) {
    this.dialogRef.close({data: data});
  }
  initDetails(data: any) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



}
