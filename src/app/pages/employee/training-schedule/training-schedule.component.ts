import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';
import { TrainingDetailsComponent } from './training-details/training-details.component';

@Component({
  selector: 'app-training-schedule',
  templateUrl: './training-schedule.component.html',
  styleUrls: ['./training-schedule.component.scss']
})
export class TrainingScheduleComponent implements OnInit {
  showViewEmpDetailPage = false;
  dataSource: MatTableDataSource<any>;
  empdes: any = ['employeeId', 'name', 'team', 'doj', 'empDesignation', 'action'];
  empList: { id: number; name: string; team: string; doj: string; designation: string; experence: string; }[];
  dataService: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    public global: GlobalService,
    public restApi: RestService,
  ) {
  }

  ngOnInit(): void {
    this.initEmpList();
  }

  initEmpList() {
    this.restApi.getService('api/web/v1/display/all/trainingDetails',).subscribe(
      (resp: any) => {
        this.empList = resp?.data;
        this.dataSource = new MatTableDataSource<any>(this.empList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (err: any) => {
        
        if (err.respCode === 'HMS_02') {
          this.global.showAlert('401 Unauthorized response', 'token not found in the header');
        }
      });
  }

  showDetails(data: any, mode: string): void {
    data.mode = mode;
    const dialogRef = this.dialog.open(
      TrainingDetailsComponent, {
      panelClass: 'custom-modal',
      width: '100%',
      data: data,
      closeOnNavigation: true,
      hasBackdrop: true,
      disableClose: true
    });
  }

  filterUser(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

