import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BirthListComponent } from './birth-list/birth-list.component';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { WishTemplatesComponent } from 'src/app/components/wish-templates/wish-templates.component';
import { RestService } from 'src/app/services/rest.service';
import { BirthdayCardComponent } from 'src/app/components/birthday-card/birthday-card.component';
import { GlobalService } from 'src/app/services/global.service';
import { AlertService } from 'src/app/services/alerts.service';


@Component({
  selector: 'app-birthday-wishes',
  templateUrl: './birthday-wishes.component.html',
  styleUrls: ['./birthday-wishes.component.scss']
})
export class BirthdayWishesComponent {
  empDetail: any;
  datasource11!: MatTableDataSource<any>;
  details: string[] = ['empName', 'date', 'employeeId', 'designation', 'action'];
  upcomingdetails: any[] = [];
  datasource1!: MatTableDataSource<any>;
  upcoming: string[] = ['id', 'name', 'designation', 'date'];
  tempdetails: any[] = [];
  datasource2!: MatTableDataSource<any>;
  temp: string[] = ['id', 'title', 'body', 'description', 'celebrationType', 'image', 'priority', 'actions'];
  joindetails: any[] = [];

  constructor(public dialog: MatDialog,
    public restApi: RestService,
    public global: GlobalService,
    public rest: RestService,
    private alertService: AlertService) {
  }
  wishestemplate(data: any, mode: string): void {
    data.mode = mode;
    const dialogRef = this.dialog.open(
      WishTemplatesComponent, {
        panelClass: 'custom-modal',
        data: data,
        width: '80%',
        closeOnNavigation: true,
        hasBackdrop: true,
        disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Alert Data: ' + JSON.stringify(result));
    });
  }


  showDetails(data: any, mode: string): void {
    data.mode = mode;
    const dialogRef = this.dialog.open(
      BirthListComponent, {
        panelClass: 'custom-modal',
        data: data,
        width: '80%',
        closeOnNavigation: true,
        hasBackdrop: true,
        disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Alert Data: ' + JSON.stringify(result));
      this.inittempdetails();

    });
  }

  ngOnInit(): void {

    this.initjoindetail();
    this.initupcomingdetails();
    this.inittempdetails();

  }
  //this code for databinding to table in coloum for joining details -->

  initjoindetail() {
    this.rest.getService('api/web/v1/display/all/birthdayDetails').subscribe((resp: any) => {
      this.joindetails = resp.data;
      this.datasource11 = new MatTableDataSource<any>(this.joindetails);
      console.log(resp.data);
    })
  }

  //this code for databinding to table in coloum for joining details -->

  initupcomingdetails() {
    this.rest.getService('api/web/v1/display/all/birthdayDetailsopcming').subscribe((resp: any) => {
      this.upcomingdetails = resp.data;
      this.datasource1 = new MatTableDataSource<any>(this.upcomingdetails);
      console.log(resp.data);
    })

  }

  //this code for databinding to table in coloum for joining details -->
  inittempdetails() {
    this.rest.getService('api/web/v1/get/template/BIRTH_DAY').subscribe(
      (resp: any) => {
        this.tempdetails = resp.data;
        this.datasource2 = new MatTableDataSource<any>(this.tempdetails);
      })
  }

  openDialog(data: any, mode: string): void {
    console.log("id" + data.employeeId);
    console.log(data);
    data.mode = mode;
    this.restApi.getService('api/web/v1/get/template/BirthdayCard/' + data.employeeId,).subscribe(
      (resp: any) => {
        if (resp.respCode === 'HMS_00') {
          this.empDetail = resp.data;
          this.openBirthdayCard(this.empDetail[0]);
        }
      }, (err: any) => {
        
        if (err.respCode === 'HMS_01') {
          this.global.showAlert(err.message, err.data);
        }
      }
    );
  }

  openBirthdayCard(data: any) {
    const dialogRef = this.dialog.open(
      BirthdayCardComponent, {
      panelClass: 'custom-modal',
      data: data,
      width: '80%',
      height: '80%',
      closeOnNavigation: true,
      hasBackdrop: true,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Alert Data: ' + JSON.stringify(result));
    });
  }

  deleteTemplate(data: any) {
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








