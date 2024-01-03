import { BreakpointObserver } from '@angular/cdk/layout';
import { Component,Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  EventEmitter,
  Output
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessagesComponent } from 'src/app/components/messages/messages.component';
import { NotificationsComponent } from 'src/app/components/notifications/notifications.component';
import { GlobalService } from 'src/app/services/global.service';


@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopHeaderComponent implements OnInit {
  @Output() menuToggled = new EventEmitter<boolean>();
  elem:any;
  user: string = 'Suryakant!';
  isFullScreen=false;


  constructor(private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    public global: GlobalService,
    @Inject(DOCUMENT) private document: any
  ) { }
  
  ngOnInit(): void {
    this.elem = this.document.documentElement;
  }

  openNotificationBox(ev: any) {
    console.log(ev.target.value);
    const dialogRef = this.dialog.open(NotificationsComponent, {
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
  }
  checkFullScreenStatus() {
    if(this.isFullScreen) {
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
    this.isFullScreen=true;
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
    this.isFullScreen=false;
  }
}
