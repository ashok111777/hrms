import { DatePipe } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AlertService } from 'src/app/services/alerts.service';
import { RestService } from 'src/app/services/rest.service';

import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { onsiteDetails, onsiteEmpList } from 'src/app/components/onsite-detail/onsite-detail.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY'
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  }
};

@Component({
  selector: 'app-onsite-list',
  templateUrl: './onsite-list.component.html',
  styleUrls: ['./onsite-list.component.scss'],
  providers: [{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  },
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class OnsiteListComponent {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  onsiteEmpForm: FormGroup;
  pageSize: number = 1;
  pageIndex: number = 0;
  totalItems: onsiteDetails[] = this.data.onsiteDetails;
  onsiteDetailList: onsiteDetails[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: onsiteEmpList,
    public childDialogRef: MatDialogRef<OnsiteListComponent>,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private alertService: AlertService,
    private rest: RestService,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.initForm();
  }
  closeDialog() {
    this.dialog.closeAll();
  }
  initForm() {
    this.onsiteEmpForm = this.fb.group({
      id: [''],
      name: [''],
      dept: [''],
      desg: [''],
      empId: [''],
      onsiteLocation: [''],
      countryName: [''],
      productName: [''],
      fromDate: [''],
      toDate: [''],
      earlyOrExtendDate: ['', Validators.required],
      conformationFlag: [],
      description: ['', Validators.required],
      purposeOfVisit: [''],
    });
    this.bindForm();
  }

  formatDate(event: MatDatepickerInputEvent<Date>) {
    console.log((event.target.value?.toISOString()));
    this.onsiteEmpForm.controls['earlyOrExtendDate'].setValue(event.target.value?.toISOString());
  }

  convertToISODate(dateString: string): string {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  }

  bindForm() {
    const earlyOrExtendDate = new Date(this.convertToISODate(this.data.onsiteDetails[this.pageIndex].earlyOrExtendDate));
    console.log(earlyOrExtendDate);
    this.onsiteEmpForm.setValue({
      id: this.totalItems[this.pageIndex].id,
      name: this.data.name,
      dept: this.data.team,
      desg: this.data.designation,
      empId: this.data.employeeId,
      onsiteLocation: this.data.onsiteDetails[this.pageIndex].onsiteLocation,
      countryName: this.data.onsiteDetails[this.pageIndex].countryName,
      productName: this.data.onsiteDetails[this.pageIndex].productName,
      fromDate: this.data.onsiteDetails[this.pageIndex].fromDate,
      toDate: this.data.onsiteDetails[this.pageIndex].toDate,
      earlyOrExtendDate: (this.data.onsiteDetails[this.pageIndex].earlyOrExtendDate === null || '' || undefined) ? '' : earlyOrExtendDate,
      conformationFlag: this.data.onsiteDetails[this.pageIndex].conformationFlag,
      description: this.data.onsiteDetails[this.pageIndex].description,
      purposeOfVisit: this.data.onsiteDetails[this.pageIndex].purposeOfVisit,
    });
  }
  changePage(event: any) {
    this.pageIndex = event
    this.bindForm();
  }

  get formStatus() {
    if ((this.onsiteEmpForm.controls['earlyOrExtendDate'].value && this.onsiteEmpForm.controls['description'].value) === null || undefined) return true;
    else return false;
  }

  async showCnfAlert(event: string) {
    if (event === 'U') {
      const cnfScreen = await this.alertService.showCnfAlert('ALERT', 'Are you sure to Update Data?');
      cnfScreen.afterClosed().subscribe((result: any) => {
        if (result === 'Y') {
          this.onsiteEmpForm.controls['conformationFlag'].setValue(true);
          this.updateDetail();
        }
      });
    }
    else {
      const cnfScreen = await this.alertService.showCnfAlert('ALERT', 'Are you sure to Delete this Onsite Detail?');
      cnfScreen.afterClosed().subscribe((result: any) => {
        if (result === 'Y') {
          this.onsiteEmpForm.controls['conformationFlag'].setValue(true);
          this.deleteOnsiteDetail();
        }
      });
    }

  }

  updateDetail() {
    const id = this.onsiteEmpForm.controls['id'].value;
    console.log('Selected Date: ' + this.onsiteEmpForm.controls['earlyOrExtendDate'].value);
    console.log('Transformed Date: ' + this.datePipe.transform(this.onsiteEmpForm.controls['earlyOrExtendDate'].value, 'yyyy-MM-dd'));
    const earlyOrExtendDate = this.datePipe.transform(this.onsiteEmpForm.controls['earlyOrExtendDate'].value, 'yyyy-MM-dd');
    const postData = {
      conformationFlag: this.onsiteEmpForm.controls['conformationFlag'].value,
      description: this.onsiteEmpForm.controls['description'].value,
      earlyOrExtentDate: earlyOrExtendDate,
    };
    this.rest.update(`api/web/v1/update/onsite/${id}`, postData).subscribe(async (resp: any) => {
      if (resp.respCode === 'HMS_00') {
        const dialogRef = await this.dialog.open(
          AlertComponent, {
          panelClass: 'custom-modal',
          width: '450px',
          data: { title: resp.respStatus, message: resp.message || resp.data, type: 'SUCCESS' },
        });
        dialogRef.afterClosed().subscribe(resp => {
          this.dialog.closeAll();
        })
      } else {
        this.alertService.showFailedAlert(resp.respStatus, resp.message || resp.respCode);
      }
    });
  }

  deleteOnsiteDetail() {
    const id = this.onsiteEmpForm.controls['id'].value;
    this.rest.putData(`api/web/v1/delete/onsite/${id}`).subscribe(async (resp: any) => {
      if (resp.respCode === 'HMS_00') {
        const alert = await this.dialog.open(
          AlertComponent, {
          panelClass: 'custom-modal',
          width: '450px',
          data: { title: resp.respStatus, message: resp.message || resp.data, type: 'SUCCESS' },
        });
        alert.afterClosed().subscribe(result => {
          console.log('Alert Data: ' + result);
          if (result) {
            this.childDialogRef.close();
          }
        });;
      } else {
        this.alertService.showAlert(resp.respStatus, resp.data || resp.message || resp.respCode);
      }
    });
  }

  getDetails(employeeDetails: onsiteEmpList) {
    console.log(employeeDetails);
    this.rest.getService(`api/web/v1/get/onsite/details/${employeeDetails.id}`).subscribe((resp: any) => {
      if (resp.respCode === 'HMS_00') {
        this.data = resp.data;
        this.data.mode = false;
      } else {
        this.alertService.showAlert(resp.respStatus, resp.message);
      }
    });
  }


}
