import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';
import { AddEditFestivalComponent } from '../events/leave-calender/add-edit-festival/add-edit-festival.component';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent {
  holidayRow: any[] = ["no", "festivalName", "date", "description", "action"];
  dataSource: MatTableDataSource<any>;
  deletingholidays = false;
  constructor(private rest: RestService, public global: GlobalService, public dialog: MatDialog) { }

  holidaysList: any[] = [];
  getHolidays() {
    const holidaysApi = 'api/web/v1/allfestivalDetails';
    this.rest.getService(holidaysApi).subscribe((res: any) => {
      this.holidaysList = res.data;
      this.dataSource = new MatTableDataSource<any>(this.holidaysList);
    })
  }
  ngOnInit(): void {
    this.getHolidays();
  }
  addFestive() {
    const dialogRef = this.dialog.open(
      AddEditFestivalComponent, {
      panelClass: 'custom-modal',
      width: '450px',
      //data: data,
      closeOnNavigation: true,
      hasBackdrop: true,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Alert Data: ' + JSON.stringify(result));
      this.getHolidays();
    });

  }

  filterUser(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  askForDeletion(id: any) {
    const dialogRef = this.global.showCnfAlert('Alert', 'Do you want to Delete this Festival?');
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Y') {
        this.deleteList(id);
      }
      if (result === 'N') {
        const dialogRef = this.global.showToast('you cancelled the request');
      };
    });
  }

  deleteList(id: any) {
    this.deletingholidays = true;
    this.rest.deleteData('api/web/v1/delete/festivle/' + id).subscribe(
      (resp: any) => {
        if (resp.respCode === 'HMS_00' || resp.respCode === 'HMS_00') {
          this.getHolidays();
          this.deletingholidays = false;
          const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data);
        }
      }, (err: any) => {
        this.deletingholidays = false;
        
      }
    )
  }
}
