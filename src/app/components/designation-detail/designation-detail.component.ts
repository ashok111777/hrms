import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { LoaderService } from 'src/app/services/loader.service';
import { RestService } from 'src/app/services/rest.service';
@Component({
  selector: 'app-designation-detail',
  templateUrl: './designation-detail.component.html',
  styleUrls: ['./designation-detail.component.scss']
})
export class DesignationDetailComponent implements OnInit {
  designationFormGroup: FormGroup;

  constructor(
    public global: GlobalService,
    public restApi: RestService,
    public dialogRef: MatDialogRef<DesignationDetailComponent>,
    public loaderService: LoaderService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.initForm();
    this.dialogRef.disableClose = true;
    if (this.data.mode !== 'A') {
      this.designationFormGroup.patchValue({
        id: this.data.id,
        desigName: this.data.designation,
        description: this.data.description
      });
    }
  }

  initForm() {
    this.designationFormGroup = new FormGroup({
      id: new FormControl(''),
      desigName: new FormControl('', [Validators.required,]),
      description: new FormControl('', [Validators.required,]),
    });
  }

  async sendSaveRequest() {
    let employee: any = {
      "designation": this.designationFormGroup.value.desigName,
      "description": this.designationFormGroup.value.description,
    }
    setTimeout(() => {
      this.sendRequest(employee);
    }, 1000);
  }

  sendRequest(data: any) {
    this.restApi.postDatanewuser('api/web/v1/designation/add', data).subscribe(
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

  async update() {
    let updateemployee: any = {
      "id": this.designationFormGroup.value.id,
      "designation": this.designationFormGroup.value.desigName,
      "description": this.designationFormGroup.value.description,
    }
    setTimeout(() => {
      this.updateRequest(updateemployee);
    }, 1000);
  }

  updateRequest(data: any) {
    this.restApi.update('api/web/v1/designation/update', data).subscribe(
      (resp: any) => {
        if (resp.respCode === 'HMS_00') {
          const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data);
          this.close(data)
        }
      }, (err: any) => {
        
        if (err.respCode === 'HMS_01') {
          this.global.showAlert('404 Page Not Found', 'internal server error');
        }
      }
    )
  }

  close(data: any) {
    this.dialogRef.close({ data: data });
  }
}

export interface DialogData {
  id: string;
  designation: string;
  description: string;
  mode: string;
}