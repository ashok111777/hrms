import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alerts.service';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';
import { AuthGuard } from 'src/app/auth-guards/auth.guard';
import { LoaderService } from 'src/app/services/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { SetnewpasswordComponent } from '../setnewpassword/setnewpassword.component';
import { SharedService } from 'src/app/services/shared.service';
import { NotificationsComponent } from 'src/app/components/notifications/notifications.component';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  showPassword: boolean = false;
  submitted = false;
  matcher = new MyErrorStateMatcher();
  username: any;
  password: any;
  loading: boolean;
  logintype: string = '';
  loginValid = true;
  instType: string = 'CGS';
  dynamicPage: any = [];
  token: string; // Declare a variable to hold the token
  constructor(
    public global: GlobalService,
    public restApi: RestService,
    private router: Router,
    private authGuard: AuthGuard,
    public alert: AlertService,
    public loderservice: LoaderService,
    private dialog: MatDialog,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.sharedService.getfcmtoken.subscribe((message) => {
      this.token = message;
      console.log(this.token);
    });

  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  menuList() {
    this.restApi.getService('auth/web/v1/application/menus/' + sessionStorage.getItem('dummyprofileId')).subscribe(
      (res: any) => {
        this.dynamicPage = res.data;
        this.router.navigate([`/main/${this.dynamicPage[0].menus[this.dynamicPage[0].menus.length - 1].url}`]);
      });
  }

  validateForm() {
    this.submitted = true;
    console.log('Validating form');
    var data: any = {
      userName: this.username,
      password: this.encryptPassword(this.password),
      webToken: this.token
    };
  this.restApi.postLoginData('auth/web/v1/login', data).subscribe(
    (resp: any) => {
      // shared service using here to share a data from another module this is best way to transfer the data.
      this.sharedService.setUserLoggedIn(true);//ideal time out module code tigger to be true
      this.sharedService.setSharedData(resp.data);
      if (resp.respCode == 'HMS_00') {
        this.sharedService.setshowtemp(true);
        this.sharedService.trigger();
        sessionStorage.setItem('dummyUserId', resp.data.userId);
        sessionStorage.setItem('dummyprofileId', resp.data.profileId);
        sessionStorage.setItem('username', resp.data.userName);
        data.userID = resp.data.userId
        this.restApi.authToken = resp.data.token;
        this.authGuard.authToken = resp.data.token;
        localStorage.setItem('token', this.restApi.authToken);
        if (resp.data.loginType == 'NEW_PASSWORD') {
          console.log('it working');
          const dialogRef = this.dialog.open(SetnewpasswordComponent, {
            width: '850px',
            data: { resp }
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log('Dialog closed with result:', result);
          });

        }
        else if (resp.data.loginType == 'UPDATED_PASSWORD') {
          this.menuList();
        }
      }
      else if (resp.respCode == 'HMS_01') {
        console.log('alert');
        this.alert.displayAlert(resp.respStatus, resp.message);
      }
    }, (err: any) => {
      
    }
  );
  }

  openPage(page: string) {
    this.router.navigateByUrl(page);
  }

  encryptPassword(pwd: string) {
    const key = 'ef17699fba61db57752203c42f448a9dea5325921819c69f12500434505dc68e7cf';
    const encryptedData = CryptoJS.AES.encrypt(pwd, key).toString();
    return encryptedData;
  }

}


function data(value: any): void {
  throw new Error('Function not implemented.');
}

