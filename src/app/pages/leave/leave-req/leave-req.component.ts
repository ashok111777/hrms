import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from 'src/app/services/rest.service';
import { LeavedetailListComponent } from '../leavedetail-list/leavedetail-list.component';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-leave-req',
  templateUrl: './leave-req.component.html',
  styleUrls: ['./leave-req.component.scss']
})
export class LeaveReqComponent implements OnInit {


  respBasedId: any;//---> bottom sheet data from api
  displayedColumn: any[] = ['leaveid', 'fullname', 'teamName', 'applyDate', 'leaveStatus', 'actions'];
  dataSource: MatTableDataSource<any>;
  leaveList: any;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(public restApi: RestService,
    private _bottomSheet: MatBottomSheet,
    public global:GlobalService) {
  }
  ngOnInit(): void {
    this.leavereqlist();
  }

  leavereqlist() {
    this.restApi.getService('api/web/v1/display/employee/leavedetails',).subscribe(
      (resp: any) => {
        this.leaveList = resp.data;
        this.dataSource = new MatTableDataSource<any>(this.leaveList);
        this.dataSource.paginator = this.paginator;
      }, (err: any) => {
        
        // alert('bad connection or server time out')
      }
    )
  }

  showDetails(data: any, mode: string): void {

    data.mode = mode;//---> data is the all data in form . mode is the pass the v or e value.
    console.log("id" + data.leaveid);
    this.restApi.getService('api/web/v1/employee/leavedetailsByid/' + data.leaveid,).subscribe(
      (resp: any) => {
        if (resp.respCode === 'HMS_00') {
          this.respBasedId = resp.data;
          this.respBasedId.mode = mode;
          const config: MatBottomSheetConfig = {
            hasBackdrop: true,
            disableClose: true,
            panelClass: 'bottom-sheet-container',
            closeOnNavigation: true,
            ariaLabel: 'Add New User',
            data: this.respBasedId,
          }
          this._bottomSheet.open(LeavedetailListComponent, config);

        }
        if (resp.respCode !== 'HMS_00') {
          this.global.showAlert(resp.respStatus, resp.message);
        }

      }, (err: any) => {
        
        // alert('bad connection or server time out')
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
}

