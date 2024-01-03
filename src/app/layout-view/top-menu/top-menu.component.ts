import { DOCUMENT, DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessagesComponent } from 'src/app/components/messages/messages.component';
import { NotificationsComponent } from 'src/app/components/notifications/notifications.component';
import { AlertService } from 'src/app/services/alerts.service';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {
  userName: any;
  @Output() menuToggled = new EventEmitter<boolean>();
  elem: any;
  todayNotificationsCount$ = this.sharedService.todayNotificationsCount$;
  isFullScreen = false;
  userid: string;
  today: string;
  hidden: boolean;
  constructor(
    public dialog: MatDialog,
    private restapi: RestService,
    private alertService: AlertService,
    public global: GlobalService,
    public router: Router,
    private sharedService: SharedService,
    private datePipe: DatePipe,
    @Inject(DOCUMENT) private document: any
  ) {
    this.sharedService.getSharedData().subscribe(data => {
      this.userid = data?.userId;
    });
  }

  ngOnInit(): void {
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || ''; // Format the current date
    this.userName = sessionStorage.getItem('username');
    this.elem = this.document.documentElement;
    this.notificationcount();
    this.sharedService.triggerNotification$.subscribe(() => {
     console.log('it tigger or not from top menu');
     this.notificationcount();
     this.hidden = false;
    });
  }
  notificationcount(){
    this.restapi.getService('auth/web/v1/notification/Count/' + `${sessionStorage.getItem('dummyUserId')}`).subscribe((res: any) => {
      if (res.respCode == 'HMS_00') {
        this.sharedService.setTodayNotificationsCount(res.data);
        if (res.data == 0) {
          
          this.hidden = !this.hidden
        }
      }
    });
  }
  openNotificationBox(ev: any) {
    const dialogRef = this.dialog.open(NotificationsComponent, {
      width: '400px',
      position: {
        top: '60px',
        right: '10px'
      }
    });
  }
  openMessagesBox(ev: any) {
    console.log(ev.target.value);
    const dialogRef = this.dialog.open(MessagesComponent, {
      width: '400px',
      panelClass: 'post-dialog-container',
      hasBackdrop: true,
      backdropClass: 'no-shadow',
      position: {
        top: '60px',
        right: '10px'
      }
    });
  }

  logout(): void {
    console.log('Logged out');
    this.restapi.getService("auth/web/v1/logout").subscribe((resp: any) => {
      if (resp.respCode == "HMS_00") {
        console.log("logout");
        this.router.navigate(['/prelogin']);
        sessionStorage.clear();
      } else {
        this.alertService.showAlert(resp.message, resp.data.message);
      }
    });

  }
  checkFullScreenStatus() {
    if (this.isFullScreen) {
      this.closeFullscreen();
    } else {
      this.openFullscreen();
    }
  }
  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
    this.isFullScreen = true;
  }

  /* Close fullscreen */
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
    this.isFullScreen = false;
  }
}
