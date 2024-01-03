import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { LoaderService } from 'src/app/services/loader.service';
import { RestService } from 'src/app/services/rest.service';
import { DepartmentDetailsComponent } from '../department-details/department-details.component';

@Component({
  selector: 'app-productmgmt-details',
  templateUrl: './productmgmt-details.component.html',
  styleUrls: ['./productmgmt-details.component.scss']
})
export class ProductmgmtDetailsComponent {
  departmentFormGroup = new FormGroup({
    productName: new FormControl('', [Validators.required,]),
    productDescription: new FormControl('', [Validators.required,]),
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
      this.departmentFormGroup.patchValue({
        id: data.id,
        productName: data.productName,
        productDescription: data.productDescription
      });
    }
  }

  async sendSaveRequest() {
    let employee: any = {
      "productName": this.departmentFormGroup.value.productName,
      "productDescription": this.departmentFormGroup.value.productDescription,
    }
    setTimeout(() => {
      this.sendRequest(employee);
    }, 1000);
  }

  sendRequest(data: any) {
    this.restApi.postDatanewuser('api/web/v1/add/product/details', data).subscribe(
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
      "productName": this.departmentFormGroup.value.productName,
      "productDescription": this.departmentFormGroup.value.productDescription,
    }
    setTimeout(() => {
      this.updateRequest(updateemployee);
    }, 1000);
  }

  updateRequest(data: any) {
    this.restApi.update('api/web/v1/update/products', data).subscribe(
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
  productName: string | null;
  productDescription: string | null;

}