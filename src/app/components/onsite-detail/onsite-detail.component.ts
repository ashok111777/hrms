import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTabChangeEvent } from '@angular/material/tabs';

import { AlertService } from 'src/app/services/alerts.service';
import { RestService } from 'src/app/services/rest.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { OnsiteListComponent } from 'src/app/pages/onsite-list/onsite-list.component';

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
  selector: 'app-onsite-detail',
  templateUrl: './onsite-detail.component.html',
  styleUrls: ['./onsite-detail.component.scss'],
  providers: [{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  },
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class OnsiteDetailComponent {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  mode: string;
  tabIndex: number;
  onsiteEmpForm: FormGroup;
  empDetails: empDetailList[];
  productDetails: productDetailList[] = [];
  empCode: string;
  onsiteEmployeeList: onsiteEmpList[] = [];
  searchTerm: any;
  pageIndex: number = 0;
  pageSize: number = 8;
  pageSizeArray: number[] = [4, 8];
  totalPageItems: number;
  openedDialog: MatDialog;


  constructor(
    private fb: FormBuilder,
    private rest: RestService,
    private alertService: AlertService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
  ) { }
  ngOnInit() {
    // this.mode = 'CREATE';
    this.mode = 'ADD';
    this.initForm();
    // this.rest.getOnsiteEmployeeList();
    this.getEmployeeDetails();
  }
  changeMode(mode: string) {
    this.mode = mode;
  }

  initForm() {
    this.onsiteEmpForm = this.fb.group({
      empCode: ['', Validators.required],
      name: [''],
      dept: ['', Validators.required],
      desg: ['', Validators.required],
      empId: ['', Validators.required],
      onsiteLocation: ['', Validators.required],
      countryName: ['', Validators.required],
      productName: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      earlyOrExtendDate: [''],
      conformationFlag: [],
      description: [''],
      purposeOfVisit: ['', Validators.required]
    });
  }
  getEmployeeDetails() {
    this.rest.getService('api/web/v1/display/employee/all').subscribe(
      (resp: any) => {
        if (resp.respCode === 'HMS_00') {
          this.empDetails = resp.data;
          this.getProductDetails()
        } else {
          this.alertService.showFailedAlert(resp.respStatus, resp.message || resp.respCode);
        }
      }, (err: any) => {
        
        if (err.respCode === 'HMS_01') {
          this.alertService.showAlert('404 Page Not Found', 'server internal error');
        }
      }
    );
  }
  getProductDetails() {
    this.rest.getService('api/web/v1/get/product/details').subscribe((resp: any) => {
      if (resp.respCode === 'HMS_00') {
        this.productDetails = resp.data;
      } else {
        this.alertService.showFailedAlert(resp.respStatus, resp.message || resp.respCode);
      }
    }, (err: any) => {
      if (err.respCode === 'HMS_01') {
        this.alertService.showAlert('404 Page Not Found', 'server internal error');
      }
    });
  }
  bindData(event: any) {
    // const empId = event.source.value;
    const empId = event;
    console.log(empId);
    if (empId) {
      for (let emp of this.empDetails) {
        if (emp.employeeId === empId) {
          this.onsiteEmpForm.controls['empCode'].patchValue(emp.employeeId);
          this.onsiteEmpForm.controls['dept'].patchValue(emp.teamName);
          this.onsiteEmpForm.controls['desg'].patchValue(emp.designation);
          this.onsiteEmpForm.controls['empId'].patchValue(emp.id);
          this.empCode = this.onsiteEmpForm.controls['empCode'].value;
        }
      }
    }
  }
  async showCnfPopUp() {
    const cnfScreen = await this.alertService.showCnfAlert('ALERT', 'Are you sure to create an Employee for Onsite Detail?');
    cnfScreen.afterClosed().subscribe((result: any) => {
      if (result === 'Y') {
        this.onsiteEmpForm.controls['conformationFlag'].setValue(true);
        this.createDetail();
      }
    });
  }
  createDetail() {
    const fromDate = this.datePipe.transform(this.onsiteEmpForm.controls['fromDate'].value, 'YYYY-MM-dd')
    const toDate = this.datePipe.transform(this.onsiteEmpForm.controls['toDate'].value, 'YYYY-MM-dd')
    const postData = {
      empId: this.onsiteEmpForm.controls['empId'].value,
      onsiteLocation: this.onsiteEmpForm.controls['onsiteLocation'].value,
      countryName: this.onsiteEmpForm.controls['countryName'].value,
      productName: this.onsiteEmpForm.controls['productName'].value,
      fromDate: fromDate,
      toDate: toDate,
      earlyOrExtendDate: '',
      conformationFlag: this.onsiteEmpForm.controls['conformationFlag'].value,
      description: '',
      purposeOfVisit: this.onsiteEmpForm.controls['purposeOfVisit'].value,
    };
    this.rest.postDatanewuser('api/web/v1/add/onsite/details', postData).subscribe((resp: any) => {
      if (resp.respCode === 'HMS_00') {
        this.alertService.showSuccessAlert(resp.respStatus, 'You have Successfully Created Onsite Employee Details');
        this.tabIndex = 1;
        this.empCode = '';
        this.onsiteEmpForm.reset();
      } else {
        this.alertService.showFailedAlert(resp.restStatus, resp.message || resp.respCode);
      }
    });
  }
  resetForm() {
    this.empCode = '';
    this.onsiteEmpForm.reset();
  }
  changeTab(event: MatTabChangeEvent) {
    if (event.index === 1) {
      this.getOnsiteEmployees();
      this.onsiteEmpForm.reset();
      this.empCode = '';
    }
  }
  getOnsiteEmployees() {
    this.rest.getService('api/web/v1/get/onsite/details').subscribe((resp: any) => {
      if (resp.respCode === 'HMS_00') {
        this.onsiteEmployeeList = resp.data;
        this.totalPageItems = this.onsiteEmployeeList.length;
      } else {
        this.alertService.showAlert(resp.respStatus, resp.message || resp.respCode);
      }
    });
  }

  getDetails(employeeDetails: onsiteEmpList, mode: string) {
    let data: onsiteEmpList;
    this.rest.getService(`api/web/v1/get/onsite/details/${employeeDetails.id}`).subscribe(async (resp: any) => {
      if (resp.respCode === 'HMS_00') {
        data = resp.data;
        if (mode === 'V') data.mode = false;
        else data.mode = true;
        const dialog = await this.dialog.open(OnsiteListComponent, {
          data: data,
          closeOnNavigation: true,
          disableClose: false,
          height: '80vh',
          width: '80vw',
        });
        dialog.afterClosed().subscribe((res: any) => {
          this.getOnsiteEmployees();
        })
      } else {
        this.alertService.showAlert(resp.respStatus, resp.message);
      }
    });
  }

  getPageData(): onsiteEmpList[] {
    const startIndex = this.pageIndex * this.pageSize;
    return this.onsiteEmployeeList.slice(startIndex, startIndex + this.pageSize);
  }

  changePage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  async cnfDelete(emp: onsiteEmpList) {
    if (emp.onsiteDetails.length > 0) {
      this.alertService.showAlert('ALERT', 'Please Delete all Onsite Detail List of this Employee to remove from List!');
    } else {
      const cnfDelete = await this.alertService.showCnfAlert('Delete', 'Do you want to delete this employee from Onsite Detail List?');
      cnfDelete.afterClosed().subscribe((res: any) => {
        
        if (res === 'Y') { this.deleteOnsiteEmp(emp) };
      });
    }
  }
  deleteOnsiteEmp(emp: onsiteEmpList) {
    this.rest.putData(`api/web/v1/delete/onsite/${emp.id}`).subscribe((resp: any) => {
      if (resp.respCode === 'HMS_00') {
        this.alertService.showSuccessAlert(resp.respStatus, resp.data);
        this.getOnsiteEmployees()
      } else {
        this.alertService.showAlert(resp.respStatus, resp.data || resp.message || resp.respCode);
      }
    });
  }
}

export interface empDetailList {
  id: number;
  employeeId: number;
  firstName: string;
  lastName: string;
  teamName: string;
  designation: string;
  doj: Date | any | string;
}

export interface productDetailList {
  id: number;
  productName: string;
  productDescription: string;
}

export interface onsiteEmpList {
  id: number;
  employeeId: number;
  name: string;
  team: string;
  designation: string;
  mode?: boolean;
  dialogRef?: any;
  onsiteDetails: onsiteDetails[];
}

export interface onsiteDetails {
  id: number;
  onsiteLocation: string;
  countryName: string;
  productName: string;
  fromDate: Date | string;
  toDate: Date | string;
  earlyOrExtendDate: string;
  conformationFlag: boolean;
  description: string;
  purposeOfVisit: string;
}