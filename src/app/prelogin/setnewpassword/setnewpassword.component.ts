import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alerts.service';
import { GlobalService } from 'src/app/services/global.service';
import { LoaderService } from 'src/app/services/loader.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-setnewpassword',
  templateUrl: './setnewpassword.component.html',
  styleUrls: ['./setnewpassword.component.scss']
})
export class SetnewpasswordComponent implements OnInit {
  oldPassword: boolean = false;
  newPassword: boolean = false;
  cnfPassword: boolean = false;
  sharedata: any
  constructor(
    public dialogRef: MatDialogRef<SetnewpasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    public loderservice: LoaderService,
    private alert: AlertService,
    public rest: RestService,
    private cdRef: ChangeDetectorRef,
    private global: GlobalService

  ) {
    this.sharedata = data
  }
  disable: boolean = false;

  verficationForm = new FormGroup({
    // oldpassword: new FormControl('', [Validators.required]),
    newpassword: new FormControl('', [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')
    ]),
    conformpassword: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.verficationForm.get('conformpassword')?.valueChanges.subscribe(() => {
      if (this.verficationForm.get('newpassword')?.value !== this.verficationForm.get('conformpassword')?.value) {
        this.verficationForm.get('conformpassword')?.setErrors({ passwordMismatch: true });
      } else {
        this.verficationForm.get('conformpassword')?.setErrors(null);
      }
    });
  }

  submit() {
    if (this.verficationForm.valid) {
      const newPassword = this.verficationForm.value.newpassword;
      const confirmPassword = this.verficationForm.value.conformpassword;
      let newpassdetails: any = {
        'userName': this.sharedata.resp.data.userName,
        'password': confirmPassword,
        'userID': this.sharedata.resp.data.userId,
      }
      this.disable = true;
      if (newPassword === confirmPassword) {
        // Passwords match, perform update logic here

        // to do implenment the service if successfully  means it go the dashboard or else it show error.
        this.rest.postDatanewuser('auth/web/v1/reset/password', newpassdetails).subscribe((resp: any) => {
          if (resp) {
            this.loderservice.isLoading.next(false);
            this.disable = false;
            

            if (resp.respCode === 'HMS_00') {
              setTimeout(() => {
                const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data);
                console.log('password updated successfully');
                this.dialogRef.close(); // Close the dialog
                this.cdRef.detectChanges(); // Trigger change detection if needed
                this.router.navigate(['/main']);

              }, 1200);
            }
            else {
              this.disable = false;
              this.alert.displayAlert(resp.respStatus, resp.message);
              this.loderservice.isLoading.next(false);
            }
          }
        }, (err: any) => {
          this.disable = false;
          this.alert.showAlert(err.respCode, err.message);

        });
      } else {
        this.disable = false;
        console.log("Passwords don't match");
      }
    }
  }


  oldPasswordVisibility(): void {
    this.oldPassword = !this.oldPassword;
  }
  newPasswordVisibility(): void {
    this.newPassword = !this.newPassword;
  }
  cnfPasswordVisibility(): void {
    this.cnfPassword = !this.cnfPassword;
  }
  close(data: any) {
    this.dialogRef.close({ data: data });
  }

}
