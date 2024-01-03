import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WfmSatusDetailsComponent } from 'src/app/components/wfm-satus-details/wfm-satus-details.component';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-wfm-status',
  templateUrl: './wfm-status.component.html',
  styleUrls: ['./wfm-status.component.scss']
})
export class WfmStatusComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<any>;
// Original displayedColumns array
displayedColumns: string[] = [
  'empId',
  'empName',
  'empTeam',
  'requestType',
  'status',
  'action'
];

// Modified displayedColumns array without "emp" prefix
modifiedColumns: string[] = this.displayedColumns.map(column => column.replace(/^emp/, ''));

// Use modifiedColumns in your template


  formatHeader(column: string): string {
    // Replace camel case with spaces
    return column.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
  }
  
  constructor(private restapi: RestService, public dialog: MatDialog,) {

  }
  ngOnInit(): void {
    this.getlist();
  }


  filterDepartment(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getlist() {
    this.restapi.getService('api/web/v1/wfh/details').subscribe(((resp: any) => {
      
      this.dataSource = new MatTableDataSource<any>(resp.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    );
  }

  showDetails(data: any, mode: string): void {
    data.mode = mode;
    const dialogRef = this.dialog.open(
      WfmSatusDetailsComponent, {
      panelClass: 'custom-modal',
      // width: '450px',
      data: data,
      closeOnNavigation: true,
      hasBackdrop: true,
      // disableClose: true
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('Alert Data: ' + result);

    });
  }

 
}
