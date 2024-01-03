
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePickerDialogComponent } from '../date-picker-dialog/date-picker-dialog.component';

@Component({
  selector: 'app-latecome-req',
  templateUrl: './latecome-req.component.html',
  styleUrls: ['./latecome-req.component.scss']
})
export class LatecomeReqComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  empDetail: string[] = ['EmployeeId', 'FullName', 'TeamName', 'AttendanceDate', 'InTime', 'OutTime', 'Description', 'Late'];
  empList: any[] = [];
  dataSource: MatTableDataSource<any>;
  tabLabel: string = 'empList';
  teamsList: any = [];
  date: any;
  selectedDept = '';
  filteredTeamsList = this.teamsList;
  selecteddate: Date | null;
  selectedFilter: any = 'ALL';
  departmentList: any;

  constructor(
    public restApi: RestService,
    public global: GlobalService,
    private dialog: MatDialog
  ) {

  }
  ngOnInit(): void {
    this.initEmpList();
    this.filterbydate();
    this.department();
  }

  openDatePicker(): void {
    const dialogRef = this.dialog.open(DatePickerDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Selected date: ', result);
        this.date = result
        this.gettData();
        // Perform any actions with the selected date
      }
    });
  }

  opeanmatsheet() {
    if (this.selectedFilter === 'CUSTOM') {
      this.openDatePicker();
    } else {
      this.gettData();
    }
  }

  option: any = [];
  filterbydate() {
    this.option = [
      { value: 'ALL', label: 'ALL' },
      { value: 'TODAY', label: 'TODAY' },
      { value: 'YESTERDAY', label: 'YESTERDAY' },
      { value: 'THIS_WEEK', label: 'THIS WEEK' },
      { value: 'LAST_WEEK', label: 'LAST WEEK' },
      { value: 'CUSTOM', label: 'CUSTOM' },
    ];
  }

  filterdata = new FormGroup({
    filterbydate: new FormControl('ALL'),
    teamId: new FormControl(''),
  });


  gettData() {
    let selectedname = this.filterdata.value.filterbydate;
    let teamId = this.filterdata.value.teamId
    let url: string = 'api/web/v1/display/all/latecommerinfo?flag=' + selectedname + '&team=' + teamId;
    // http://localhost:8762/api/web/v1/display/all/latecommerinfo?flag=CUSTOM&date=2023-05-25
    if (selectedname == 'CUSTOM') {
      url = url + '&date=' + (this.getFormattedDate(this.date));
    }
    this.restApi.getService(url).subscribe(
      (resp: any) => {
        this.empList = resp.data;
        this.dataSource = new MatTableDataSource<any>(this.empList);
        this.dataSource.paginator = this.paginator;
      }, (err: any) => {
        if (err.respCode === 'HMS_01') {
          this.global.showAlert('404 Page Not Found', 'internal server error');
        }
        else {
          // this.global.showAlert('INTERNET_DISCONNECTED', 'pls Check the internet');
        }
      }
    )

  }
  getFormattedDate(date: any): string {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const day = ('0' + dateObj.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  initEmpList() {
    this.restApi.getService('api/web/v1/display/all/latecommerinfo').subscribe(
      (resp: any) => {
        this.empList = resp.data;
        this.dataSource = new MatTableDataSource<any>(this.empList);
        this.dataSource.paginator = this.paginator;
      }, (err: any) => {
        
        if (err.respCode === 'HMS_01') {
          this.global.showAlert('404 Page Not Found', 'internal server error');
        }
      }
    )
  }
  department() {
    this.restApi.getService('api/web/v1/display/all/teamdetails',).subscribe(
      (resp: any) => {
        this.departmentList = resp.data;
      }, (err: any) => {
        
      }
    )
  }
  filterUser(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showDetails(data: any, mode: string): void {
    data.mode = mode;
    data.inst = 'CGS';
  }
}
