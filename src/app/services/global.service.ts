import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  logo: any = 'assets/imgs/cashlink-logo.png';
  loginimg: string = 'assets/imgs/login-img.jpg';
  resetimg: string = 'assets/imgs/rest password.jpg';
  avatar: string = 'assets/imgs/men-avatar.jpg';
  designationBanner: string = 'assets/imgs/desig-banner.jpg';
  departmentBanner: string = 'assets/imgs/dept-banner.jpg';
  instituteBanner: string = 'assets/imgs/desig-banner.jpg';
  rightPane = false;
  toggleRightPane(): void {
    this.rightPane = !this.rightPane;
  }
  constructor(public dialog: MatDialog, public snackBar: MatSnackBar) { }
  showAlert(head: string, body: string): void {
    const dialogRef = this.dialog.open(
      AlertComponent, {
      panelClass: 'alert-box',
      width: '450px',
      data: { title: head, message: body, type: 'ALERT' },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Alert Data: ' + result);
    });
  }
  showSuccessAlert(head: string, body: string): void {
    const dialogRef = this.dialog.open(
      AlertComponent, {
      panelClass: 'alert-box',
      width: '450px',
      data: { title: head, message: body, type: 'SUCCESS' },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Alert Data: ' + result);
    });
  }
  showCnfAlert(head: string, body: string) {
    const dialogRef = this.dialog.open(
      AlertComponent, {
      panelClass: 'alert-box',
      width: '450px',
      data: { title: head, message: body, type: 'CNF_ALERT' },
    });
    return dialogRef;
    /* dialogRef.afterClosed().subscribe(result => {
      console.log('Alert Data: ' + result);
      return result;
    });
    return ''; */
  }
  showToast(msg: string) {
    this.snackBar.open(msg, 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  checkCurrentTime(currentHour: any) {
    if (parseInt(currentHour) >= 0 && parseInt(currentHour) < 12) return 'M';
    else if (parseInt(currentHour) >= 12 && parseInt(currentHour) < 16) return 'A';
    else if (parseInt(currentHour) >= 16 && parseInt(currentHour) < 19) return 'E';
    else return 'N';
  }
}

