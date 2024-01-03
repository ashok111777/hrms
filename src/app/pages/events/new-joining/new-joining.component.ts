import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NewJoingCardComponent } from 'src/app/components/new-joing-card/new-joing-card.component';
import { NewJoiningTemplateComponent } from 'src/app/components/new-joining-template/new-joining-template.component';
import { AlertService } from 'src/app/services/alerts.service';
import { GlobalService } from 'src/app/services/global.service';
import { LoaderService } from 'src/app/services/loader.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-new-joining',
  templateUrl: './new-joining.component.html',
  styleUrls: ['./new-joining.component.scss']
})
export class NewJoiningComponent implements OnInit {
  empDetail: any
  datasource!: MatTableDataSource<any>;
  displayedColumns1 = ['sno', 'empId', 'employeeName', 'team', 'designation', 'experience','actions'];
  newjoingdetails: any[] = [];
  dataSource1!: MatTableDataSource<any>;
  tempdetails: any[] = [];
  datasource2!: MatTableDataSource<any>;
  temp: string[] = ['id', 'wishes', 'actions'];

  constructor(public rest: RestService,
    public loaderService: LoaderService,
    public global: GlobalService,
    public dialog: MatDialog,
    private alertService: AlertService
  ) {

  }
  ngOnInit(): void {
    this.tabledetails();
    this.inittempdetails();
  }

  tabledetails() {
    this.rest.getService('api/web/v1/display/dashboard2').subscribe((resp: any) => {
      this.newjoingdetails = resp.data?.newJoinStatuses;
      this.dataSource1 = new MatTableDataSource<any>(this.newjoingdetails);
    })
  }

  wishestemplate(data: any, mode: string): void {
    // console.log("id" + data.empId);
    // data.mode = mode;
    // this.rest.getService('api/web/v1/get/template/NewJoinCard/' + data.empId).subscribe(
    //   (resp: any) => {
    //     if (resp.respCode === 'HMS_00') {
    //       this.empDetail = resp.data;
    //       for (var obj of this.empDetail) {
    //         var dataJson = obj;
    //         console.log(obj);
    //       }
    //       console.log("my data " + JSON.stringify(this.empDetail));
    //       this.openNewjoiningCard(dataJson);
    //     }
    //   }, (err: any) => {
    //     console.log(err);
    //     if (err.respCode === 'HMS_01') {
    //       this.global.showAlert(err.message, err.data);
    //     }
    //   }
    // );
  }

  openNewjoiningCard(data: any) {
    const dialogRef = this.dialog.open(
      NewJoingCardComponent, {
      panelClass: 'custom-modal',
      data: data,
      closeOnNavigation: true,
      hasBackdrop: true,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    });

  }

  showDetails(data: any, mode: string): void {
    data.mode = mode;
    const dialogRef = this.dialog.open(
      NewJoiningTemplateComponent, {
      panelClass: 'custom-modal',
      data: data,
      width: '80%',
      closeOnNavigation: true,
      hasBackdrop: true,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('Alert Data: ' + JSON.stringify(result));
      this.inittempdetails();
    });
  }
  //this code for databinding to table in coloum for joining details -->
  inittempdetails() {
    this.rest.getService('api/web/v1/get/template/NEW_JOIN').subscribe((resp: any) => {
      if (resp.respStatus === 'SUCCESS') {
        this.tempdetails = resp.data;
        this.datasource2 = new MatTableDataSource<any>(this.tempdetails);
      } else {
        this.alertService.showAlert('ALERT', resp.respCode || 'Something went wrong');
      }
    });
  }

   deleteNewJoiningTemp(data: any) {
    const id = data.id;
    this.rest.deleteTemplate('api/web/v1/template/delete/' + id).subscribe((resp: any) => {
      if (resp.respStatus === 'SUCCESS') {
        this.alertService.showSuccessAlert(resp.respStatus, resp.data);
        this.inittempdetails();
      } else {
        this.alertService.showFailedAlert('ALERT', resp.respCode || 'Something went wrong!');
      }
    });
  }
}
