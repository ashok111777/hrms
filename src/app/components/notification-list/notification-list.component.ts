import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/services/alerts.service';
import { RestService } from 'src/app/services/rest.service';
import { parse, format } from 'date-fns';
import { Pipe, PipeTransform } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  displayedColumns: string[] = ['select', 'id', 'title', 'body', 'startDateTime', 'endDateTime'];
  leaveData: MatTableDataSource<any>;
  clickedRows = new Set<any>();
  selection = new SelectionModel<any>(true, []);


  constructor(private restapi: RestService, private alertService: AlertService) {

  }


  ngOnInit(): void {
    this.getallnotication();
  }

  getallnotication() {
    this.restapi.getService('auth/web/v1/get/notifications/all').subscribe((res: any) => {
      if (res.respCode == "HMS_00") {
        res.data.sort((a: any, b: any) => {
          const dateA = this.getStandardDate(a.startDateTime);
          const dateB = this.getStandardDate(b.startDateTime);
          return dateB.localeCompare(dateA);
        });
        this.leaveData = new MatTableDataSource<any>(res.data);
        this.leaveData.paginator = this.paginator;
        this.leaveData.sort = this.sort;

      } else {
        this.alertService.showAlert(res.message, res.data.message);
      }
    });

  }
  private getStandardDate(dateString: string): string {
    // Parse date in the format "DD-MM-YYYY HH:mm:ss" and return in "YYYY-MM-DD" format
    const [day, month, year] = dateString.split(/[\s-:]/);
    return `${year}-${month}-${day}`;
  }

  transform(value: string): string {
    const parsedDate = parse(value, 'dd-MM-yyyy HH:mm:ss', new Date());
    return format(parsedDate, 'dd-MM-yyyy');
  }

  getdata(item: any) {
    var url = item.screenType;
    console.log(item);
    console.log(item.id);

    if (url === 'leaveDetailsScreen') {
      // router to leaverequest page
      console.log(url);
      // this.router.navigate(['./leaverequest']);
    } else if (url === 'leavePendingDetailScreen') {
      // router to dashboard page
      // this.router.navigate(['./dashboard']);
      console.log(url);
    } else if (url === 'wfhRequestApproveScreen') {
      // router to wfh request approve page
      // this.router.navigate(['./wfhrequestapprove']);
      console.log(url);
    } else if (url === 'trainerScreen') {
      // router to trainer page
      // this.router.navigate(['./trainer']);
      console.log(url);
    } else if (url === 'requestScreen') {
      // router to request page
      // this.router.navigate(['./request']);
      console.log(url);
    } else if (url === 'traineeScreen') {
      // router to trainee page
      // this.router.navigate(['./trainee']);
      console.log(url);
    } else if (url === 'probation') {
      // router to probation page
      // this.router.navigate(['./probation']);
      console.log(url);
    } else {
      // handle other cases or provide a default route
      console.log('Unknown URL:', url);
    }
  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.leaveData?.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
  
      this.selection.select(...this.leaveData.data);
    }
  
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }

}




