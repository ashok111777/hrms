import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDetail } from 'src/app/models/user-details';
import { GlobalService } from 'src/app/services/global.service';
import { LoaderService } from 'src/app/services/loader.service';
import { RestService } from 'src/app/services/rest.service';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  institutes:string[]=['CGS'];
  profiles=['HR', 'ADMIN', 'MANAGER'];
  userForm = new FormGroup({
    id: new FormControl('', [Validators.required,]),
    inst: new FormControl('', [Validators.required,]),
    profile: new FormControl('', [Validators.required, Validators.minLength(1)]),
    status: new FormControl(''),
    firstName: new FormControl('', [Validators.required, Validators.minLength(1)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(1)]),
    empCode: new FormControl(''),
    dob: new FormControl('', [Validators.required, Validators.minLength(10)]),
    mobile: new FormControl('', [Validators.required, Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.minLength(8)]),
    address: new FormControl('', [Validators.required, Validators.minLength(10)]),
    company: new FormControl('', [Validators.required,]),
    branch: new FormControl('', [Validators.required,]),
  });
  allComplete: boolean;
  isEditable: boolean = true;
  constructor(
    // private _bottomSheetRef: MatBottomSheetRef<UserDetailComponent>,
    // @Inject(MAT_BOTTOM_SHEET_DATA) public user: any,
    public dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public user: any,
    public global: GlobalService,
    public loaderService: LoaderService,
    public restapi: RestService
    ) { 
      console.log(user);
      if (user.mode !== 'A') {
        this.userForm.setValue({
          id: user.userId,
          inst: user.inst,
          profile: user.profile,
          status: user.status,
          firstName: user.firstName,
          lastName: user.lastName,
          empCode: user.empCode,
          dob: user.dob,
          mobile: user.mobileNo,
          email: user.emailId,
          address: user.address,
          company: user.company,
          branch: user.branch,
        });
      }
    }
  ngOnInit(): void {
    
  }

  async sendSaveRequest() {
    let employee: any = {
      "userName": this.userForm.value.id,
      "password": "ak",
      "firstName": this.userForm.value.firstName,
      "lastName": this.userForm.value.lastName,
      "emailId": this.userForm.value.email,
      "mobileNo": this.userForm.value.mobile,
      "role": "ADMIN",
      "dob": this.userForm.value.dob,
      "profile": this.userForm.value.profile,
      "status": this.userForm.value.status,
      "empCode": this.userForm.value.empCode,
      "gender": "FEMALE",
      "company": this.userForm.value.company,
      "branch": this.userForm.value.branch,
      "address": this.userForm.value.address
    }
    setTimeout(() => {
      this.sendRequest(employee);
    }, 1000);
  }

  sendRequest(data: any) {
    this.restapi.postDatanewuser('auth/web/v1/create', data).subscribe(
      (resp: any) => {
        if (resp.respCode === 'HMS_00') {
          const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data);
          this.close(data);
        }
      }, (err: any) => {
        
        if (err.respCode === 'HMS_01') {
          this.global.showAlert('404 Page Not Found', 'internal server error');
        }
      }
    )
  }
  close(event: MouseEvent): void {
    // this._bottomSheetRef.dismiss();
    event.preventDefault();
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      // You can send formData to your API or perform other actions as needed
    } else {
      // Form is not valid, display error messages if needed
    }
  }
}

