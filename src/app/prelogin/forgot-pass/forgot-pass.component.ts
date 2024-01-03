import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { PopVerificationComponent } from '../pop-verification/pop-verification.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';
import { AlertService } from 'src/app/services/alerts.service';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent {
  constructor(public global: GlobalService,
    public dialog: MatDialog,
    private router: Router,
    private rest: RestService,
    public alert: AlertService,
    public loderservice: LoaderService) {

  }

  forgotpageForm = new FormGroup({
    Empid: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
  });

  login() {
    const value = this.forgotpageForm.value.Empid
    if (value) {
      console.log(value);
      this.rest.onboarding('auth/web/v1/send/otp?empId=' + value).subscribe((resp: any) => {
        let jsondata: any = {
          'empId': value,
          'otpRefId': resp.data?.otpRefId
        }
        if (resp) {
          console.log();
          if (resp.respCode === 'HMS_00') {
            this.opeandailog(jsondata);
            // this.loderservice.isLoading.next(false);
          }
          else {
            this.alert.showAlert(resp.respStatus, resp.message,);
            // this.loderservice.isLoading.next(false);
          }
        }
      }, (err: any) => {
        // this.loderservice.isLoading.next(false);
        
        if (err.respCode !== 'HMS_00') {
          this.alert.showAlert(err.respStatus, err.message,);
        }
      });
    }
  }

  opeandailog(data: any) {
    const dialogRef = this.dialog.open(
      PopVerificationComponent, {
      panelClass: 'custom-modal',
      closeOnNavigation: true,
      hasBackdrop: true,
      disableClose: true,
      data: data

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(' Data: ' + result.data);
      // this.selectedImage = result.data;

    });
  }
  openPage(page: string) {
    this.router.navigateByUrl(page);
  }
}
