import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { LoaderService } from 'src/app/services/loader.service';
import { RestService } from 'src/app/services/rest.service';
@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.scss']
})
export class DepartmentDetailsComponent implements OnInit {
  departmentFormGroup = new FormGroup({
    deptName: new FormControl('', [Validators.required,]),
    description: new FormControl('', [Validators.required,]),
    id: new FormControl(''),
  });

  constructor(
    public global: GlobalService,
    private rest: RestService,
    public loaderService: LoaderService,
    public dialogRef: MatDialogRef<DepartmentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public restApi: RestService,
  ) {
    this.dialogRef.disableClose = true;
    if (data.mode !== 'A') {
      this.departmentFormGroup.setValue({
        id: data.id,
        deptName: data.teamName,
        description: data.description
      });
    }
  }

  async sendSaveRequest() {
    let employee: any = {
      "teamName": this.departmentFormGroup.value.deptName,
      "description": this.departmentFormGroup.value.deptName,
    }
    setTimeout(() => {
      this.sendRequest(employee);
    }, 1000);
  }

  sendRequest(data: any) {
    this.restApi.postDatanewuser('api/web/v1/team/add', data).subscribe(
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
      "id": this.departmentFormGroup.value.id,
      "teamName": this.departmentFormGroup.value.deptName,
      "description": this.departmentFormGroup.value.description,
    }
    setTimeout(() => {
      this.updateRequest(updateemployee);
    }, 1000);
  }

  updateRequest(data: any) {
    this.restApi.update('api/web/v1/team/update', data).subscribe(
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



  ngOnInit(): void { }

  close(data: any) {
    this.dialogRef.close({ data: data });
  }
}
export interface DialogData {
  id: string;
  mode: string;
  teamName: string | null;
  description: string | null;

}