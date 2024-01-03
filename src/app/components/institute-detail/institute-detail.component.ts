import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { LoaderService } from 'src/app/services/loader.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-institute-detail',
  templateUrl: './institute-detail.component.html',
  styleUrls: ['./institute-detail.component.scss']
})
export class InstituteDetailComponent implements OnInit {
  instituteFormGroup = new FormGroup({
    insId: new FormControl(''),
    instName: new FormControl('', [Validators.required,]),
    description: new FormControl('', [Validators.required,]),
  });
  constructor(
    public global: GlobalService,
    public restApi: RestService,
    public dialogRef: MatDialogRef<InstituteDetailComponent>,
    public loaderService: LoaderService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.dialogRef.disableClose = true;
    if (data.mode !== 'A') {
      this.instituteFormGroup.setValue({
        insId: data.insId,
        instName: data.name,
        description: data.description
      });
    }
  }

  async sendSaveRequest() {
    let employee: any = {
      "name": this.instituteFormGroup.value.instName,
      "description": this.instituteFormGroup.value.description,
    }
    setTimeout(() => {
      this.sendRequest(employee);
    }, 1000);
  }

  sendRequest(data: any) {
    this.restApi.postDatanewuser('api/web/v1/create/institutesNames', data).subscribe(
      (resp: any) => {
        if (resp.respCode === 'HMS_00') {
          
          const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data);
          this.close(data);
        }
        if (resp.respCode === 'HMS_01') {
          this.global.showAlert(resp.respStatus, resp.data);
        }

      }, (err: any) => {
        console.log(err);
      }
    )
  }

  async update() {
    let updateemployee: any = {
      "insId": this.instituteFormGroup.value.insId,
      "name": this.instituteFormGroup.value.instName,
      "description": this.instituteFormGroup.value.description,
    }
    setTimeout(() => {
      this.updateRequest(updateemployee);
    }, 1000);
  }

  updateRequest(data: any) {
    this.restApi.update('api/web/v1/update/institutesNames', data).subscribe(
      (resp: any) => {
        if (resp.respCode === 'HMS_00') {
          const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data);
          this.close(data)
        }
      }, (err: any) => {
        console.log(err);
        if (err.respCode === 'HMS_01') {
          this.global.showAlert('404 Page Not Found', 'internal server error');
        }
      }
    )
  }

  ngOnInit(): void {
  }
  close(data: any) {
    this.dialogRef.close({ data: data });
  }
}
export interface DialogData {
  insId: string;
  name: string;
  description: string;
  mode: string;
}