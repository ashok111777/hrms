import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})

export class NotificationsComponent implements OnInit {
  today: string;
  getmessage$: Observable<any[]>;
  todayNotifications: any[] = [];
  yesterdayNotifications: any[] = [];
  showViewMoreButton = false;
  todayNotificationsCount: number;

  constructor(private cdr: ChangeDetectorRef, private sharedservice: SharedService, private restapi: RestService, private datePipe: DatePipe, private router: Router) {

  }




  ngOnInit(): void {
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || ''; // Format the current date
    this.getmessage$ = this.restapi.getService('auth/web/v1/get/notifications/' + `${sessionStorage.getItem('dummyUserId')}`).pipe(
      map((resp: any) => resp.data),
      map((notifications: any[]) => {
        // Sort notifications by date in descending order (latest first)
        notifications?.sort((a, b) => this.parseDate(b.startDateTime).getTime() - this.parseDate(a.startDateTime).getTime());
        return notifications;
      })
    );

    this.getmessage$.subscribe((notifications: any[]) => {
      this.todayNotifications = [];
      this.yesterdayNotifications = [];

      notifications?.forEach((notification) => {
        const notificationDate = this.parseDate(notification.startDateTime);
        const formattedDate = this.datePipe.transform(notificationDate, 'yyyy-MM-dd');

        if (formattedDate === this.today) {
          notification.timestamp = this.getTimestamp(notification.endDateTime);
          this.todayNotifications.push(notification);
        } else {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayDate = this.datePipe.transform(yesterday, 'yyyy-MM-dd');

          if (formattedDate === yesterdayDate) {
            notification.timestamp = this.getTimestamp(notification.endDateTime);
            this.yesterdayNotifications.push(notification);
          }
        }
      });
      // this.todayNotificationsCount = this.todayNotifications.length; // Update the count
      this.cdr.detectChanges();
      this.readNotifications();
    });
  }

  readNotifications(): void {
    this.restapi.postDatanewuser('auth/web/v1/read/notifications/' + `${sessionStorage.getItem('dummyUserId')}`, null).subscribe((res: any) => {
      if (res.respCode === 'HMS_00') {
        this.sharedservice.setTodayNotificationsCount(0);
        this.sharedservice.trigger();
      }
    });
  }



  getTimestamp(dateString: string): string {
    const date = this.parseDate(dateString);
    return this.datePipe.transform(date, 'hh:mm a') || '';
  }

  getInitial(title: string): string {
    return title ? title.charAt(0).toUpperCase() : '';
  }

  private parseDate(dateString: string): Date {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('-');
    const [hours, minutes, seconds] = timePart.split(':');

    // Ensure that the date format matches the incoming date string format
    // Adjust as needed, the format should be 'yyyy', 'MM', and 'dd' in the correct order
    return new Date(
      parseInt(year),
      parseInt(month) - 1, // Month is 0-indexed in JavaScript Dates
      parseInt(day),
      parseInt(hours),
      parseInt(minutes),
      parseInt(seconds)
    );
  }

  getdata(item: any) {
    var url = item.screenType;
    console.log(item);
    console.log(item.id);
    // this.todayNotificationsCount--;
    // this.sharedservice.setTodayNotificationsCount(this.todayNotificationsCount);
    //auth/web/v1/notification/read/{id}
    // this.restapi.postDatanewuser('auth/web/v1/notification/read/' + `${item.id}`, null).subscribe((res: any) => {
    //   if (res.respCode == 'HMS_00') {
    //     console.log(res);
    //   }
    // });
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

  getColor(str: string = ''): string {
    return this.intToRGB(this.hashCode(str));
  }

  private intToRGB(i: number): string {
    const c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

    return '00000'.substring(0, 6 - c.length) + c;
  }

  hashCode(str: string): number { // java String#hashCode
    let hash = 10;

    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }


  showViewMore(): void {
    // Implement the logic to navigate to another route or load more content
    // For example, navigating to '/view-more'
    this.router.navigate(['./main/app-notification-list']);
  }

}




