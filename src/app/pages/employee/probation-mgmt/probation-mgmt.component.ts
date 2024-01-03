import { Component, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EmpListComponent } from '../../leave/emp-list/emp-list.component';
import { ProbationDetailsComponent } from 'src/app/components/probation-details/probation-details.component';
import { RestService } from 'src/app/services/rest.service';
import { MatSort } from '@angular/material/sort';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-probation-mgmt',
  templateUrl: './probation-mgmt.component.html',
  styleUrls: ['./probation-mgmt.component.scss']
})
export class ProbationMgmtComponent {

  empDetail: string[] = ['pbrId', 'duration', 'designation', 'actions'];
  empList: any[] = [];
  dataSource: MatTableDataSource<any>;
  tabLabel: string = 'empList';
  teamsList: any[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;




  ngOnInit(): void {
    this.initEmpList();
    this.initTeamslist();

  }

  initTeamslist() {
    this.teamsList = [
      { deptId: 'DEPT001', deptName: 'StarMPay' },
      { deptId: 'DEPT002', deptName: 'StarIFPS' },
      { deptId: 'DEPT003', deptName: 'StarRecon' },
      { deptId: 'DEPT004', deptName: 'R&D' },
      { deptId: 'DEPT005', deptName: 'StarCardman' },
      { deptId: 'DEPT006', deptName: 'EZSwitch' },
      { deptId: 'DEPT007', deptName: 'StarCAS' },
      { deptId: 'DEPT008', deptName: 'Marketing' },
      { deptId: 'DEPT009', deptName: 'Finance' },
      { deptId: 'DEPT010', deptName: 'Software Support' },
      { deptId: 'DEPT011', deptName: 'HR' },
      { deptId: 'DEPT012', deptName: 'Admin' },
      { deptId: 'DEPT013', deptName: 'Management' },
    ];
  }

  initEmpList() {
    this.rest.getService('api/web/v1/fetch-all/probationDuration').subscribe(
      (res: any) => {
        this.empList = res.data;
        this.dataSource = new MatTableDataSource<any>(this.empList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (err: any) => {
        console.log('Got Error: ' + JSON.stringify(err));
      }
    );
  }

  constructor(
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    public rest: RestService,
    public global: GlobalService,
    // public loaderService : LoaderService
  ) {
    this.dataSource = new MatTableDataSource(this.empList);
    this.getUsers();
  }


  filterUser(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getUsers() {
    this.dataSource = new MatTableDataSource<any>(this.empList);
  }
  showDetails(data: any, mode: string): void {
   

    data.mode = mode;
    const dialogRef = this.dialog.open(
      ProbationDetailsComponent, {
      panelClass: 'custom-modal',
      width: '450px',
      data: data,
      closeOnNavigation: true,
      hasBackdrop: true,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.initEmpList();
    });
  }

  askForDeletion(data: any) {
    const dialogRef = this.global.showCnfAlert('Alert', 'Do you want to delete this record?');
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Y') {
        this.deleteEmployee(data);
      }
      if( result === 'N'){
        const dialogRef = this.global.showToast( 'you cancelled the request');
      };
     
    });
  }
  
  deleteEmployee(data: any) {
    this.rest.deleteData('api/web/v1/delete/probation/duration/' + data.pbrId).subscribe(
      (resp: any) => {
        if (resp.respCode === 'HMS_00') {     
          this.initEmpList();
          const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data);
        }
      }, (err: any) => {
        if (err.respCode === 'HMS_01')
        
        alert(this.global.showAlert);
      }
    )
  }
}







