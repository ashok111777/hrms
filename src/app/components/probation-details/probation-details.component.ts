import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alerts.service';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';


@Component({
  selector: 'app-probation-details',
  templateUrl: './probation-details.component.html',
  styleUrls: ['./probation-details.component.scss']
})
export class ProbationDetailsComponent implements AfterViewInit {
  butDisabled: boolean = true;
  desiganation: any = [];
  userForm = new FormGroup({
    pbrId: new FormControl('',),
    duration: new FormControl('', [Validators.required,]),
    designation: new FormControl('', [Validators.required,]),
  });

  constructor(
    public dialogRef: MatDialogRef<ProbationDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public user: any,
    public global: GlobalService,
    public restApi: RestService,
    public alert: AlertService
  ) {
    if (user.mode !== 'A') {
      this.userForm.setValue({
        pbrId: user.pbrId,
        duration: user.duration,
        designation: user.desigId,
      });
    }
  }
  ngAfterViewInit(): void {
    this.designation();
  }
  // close(event: MouseEvent): void {
  //   this._bottomSheetRef.dismiss();
  //   event.preventDefault();
  // }

  // close(data: any): void {
  //   this._bottomSheetRef.dismiss({ data: data });
  // }
  close(data: any) {
    this.dialogRef.close({ data: data });
  }
  async sendSaveRequest() {
    let employee: any = {
      "duration": this.userForm.value.duration,
      "designationId": this.userForm.value.designation,
    }
    setTimeout(() => {
      this.sendRequest(employee);
    }, 1000);
  }

  designation() {
    this.restApi.getService('api/web/v1/display/all/designationDetail',).subscribe(
      (resp: any) => {
        this.desiganation = resp.data;
      }, (err: any) => {
        
      }
    )
  }

  sendRequest(data: any) {
    this.restApi.postDatanewuser('api/web/v1/save/probation/duration', data).subscribe(
      (resp: any) => {
        if (resp.respCode === 'HMS_00') {
          const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data);
          this.close(data);
        }
        else {
          this.alert.showAlert(resp.respStatus, resp.message);
        }
      }, (err: any) => {
        
        this.alert.showAlert(err.status, err.error);
      });
  }

  async update() {
    let updateemployee: any = {
      "pbrId": this.userForm.value.pbrId,
      "duration": this.userForm.value.duration,
      "designationId": this.userForm.value.designation,
    }
    setTimeout(() => {
      this.updateRequest(updateemployee);
    }, 1000);
  }

  updateRequest(data: any) {
    this.restApi.update('api/web/v1/employee/probation/duration/update', data).subscribe(
      (resp: any) => {
        if (resp.respCode === 'HMS_00') {
          const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data);
          this.close(data)
        } else {
          this.alert.showAlert(resp.respStatus, resp.message);
        }

      }, (err: any) => {
        
        this.alert.showAlert(err.status, err.error);
      });
  }

}
