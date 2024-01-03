import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EmployeeDetail } from 'src/app/models/Employee';
import { AlertService } from 'src/app/services/alerts.service';
import { GlobalService } from 'src/app/services/global.service';
import { LoaderService } from 'src/app/services/loader.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EmployeeDetailComponent implements AfterViewInit {
  @Input() empDetail: EmployeeDetail;
  @Output() onEmpDetailClosed = new EventEmitter<any>();
  filteredOptions: Observable<string[]> | undefined;
  filteredCountry: Observable<any[]> | undefined;
  stateList: string[] = ['Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Orissa', 'Pondicherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Tripura', 'Uttaranchal', 'Uttar Pradesh', 'West Bengal'];
  activeTab = '1';
  departmentList!: any[];
  desiganation: any;

  personalDetailForm = new FormGroup({
    firstName: new FormControl('', [Validators.required,]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    emailId: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')]),
    mobileNo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    gender: new FormControl('', Validators.required),
    dob: new FormControl(new Date, Validators.required),
    guardianName: new FormControl('', Validators.required),
    motherName: new FormControl(''),
    employeeId: new FormControl('', [Validators.required,])
  });
  residenceDetailForm = new FormGroup({
    street: new FormControl('', Validators.required),
    village: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    district: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    country: new FormControl('India', Validators.required),
    pinCode: new FormControl('', Validators.required),
    residentialAddressCheck: new FormControl('true'),
  });
  professionalDetailForm = new FormGroup({
    doc: new FormControl(new Date, Validators.required),
    doj: new FormControl(new Date, Validators.required),
    teamName: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    PreviousEmployer: new FormControl('', Validators.required),
    empType: new FormControl('', Validators.required),
    PreviousExperience: new FormControl('', Validators.required),
    PreviousDesignation: new FormControl('', Validators.required),
    Workloaction: new FormControl('', Validators.required),
    Geography: new FormControl('SOUTH', Validators.required,),
    requirementType: new FormControl('', Validators.required),
    Category: new FormControl('', Validators.required),
    qualifications: new FormControl('', Validators.required),
    experience: new FormControl('', Validators.required)
  });
  disableExperience: boolean = false;
  showCommunicationAddress: boolean = false;
  countryStateList: any;
  constructor(
    private cdRef: ChangeDetectorRef,
    public alertService: AlertService,
    private rest: RestService,
    public restApi: RestService,
    public loaderService: LoaderService,
    public global: GlobalService,
    private _bottomsheetRef: MatBottomSheetRef<EmployeeDetailComponent>,
    private bottomSheetRef: MatBottomSheetRef<EmployeeDetailComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) {
    this.filteredOptions = this.residenceDetailForm.controls['state'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterState(value || '')),
    );
  }

  get currentDate() {
    var date = new Date().toISOString();
    return date;
  }
  convertToISODate(dateString: string): string {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  }
  updatevalue(data: any) {
    this.cdRef.detectChanges();
    this.personalDetailForm.patchValue({
      firstName: data.personalDetail.firstName,
      emailId: data.personalDetail.emailId,
      lastName: data.personalDetail.lastName,
      mobileNo: data.personalDetail.mobileNo,
      gender: data.personalDetail.gender,
      dob: new Date(this.convertToISODate(data.personalDetail.dob)),
      guardianName: data.personalDetail.fatherName,
      motherName: data.personalDetail.motherName,
      employeeId: data.personalDetail.id,
    });
    this.professionalDetailForm.patchValue({
      doc: new Date(this.convertToISODate(data.professionalDetail.doc)),
      doj: new Date(this.convertToISODate(data.professionalDetail.doj)),
      teamName: data.professionalDetail.teamName,
      designation: data.professionalDetail.designation,
      PreviousEmployer: data.professionalDetail.PreviousEmployer,
      empType: data.professionalDetail.empType,
      PreviousExperience: data.professionalDetail.PreviousExperience,
      PreviousDesignation: data.professionalDetail.PreviousDesignation,
      Workloaction: data.professionalDetail.Workloaction,
      Geography: data.professionalDetail.Geography,
      requirementType: data.professionalDetail.AdditionReplacement,
      Category: data.professionalDetail.Category,
      qualifications: data.professionalDetail.qualifications,
      experience: data.professionalDetail.experience,
    })
    this.residenceDetailForm.patchValue({
      street: data.residentialDetail.street,
      village: data.residentialDetail.village,
      city: data.residentialDetail.city,
      district: data.residentialDetail.district,
      state: data.residentialDetail.state,
      country: data.residentialDetail.country,
      pinCode: data.residentialDetail.zipcode,
    })
    this.previewUrl = data.profileurl

    if (this.professionalDetailForm.value.empType == 'EXPERIENCE') {
      this.showPreviousExp = true;
    } else {
      this.showPreviousExp = false;
    }
  }


  async update() {
    let updateemployee: any = {
      "employeeId": this.personalDetailForm.value.employeeId,
      "firstName": this.personalDetailForm.value.firstName,
      "lastName": this.personalDetailForm.value.lastName,
      "gender": this.personalDetailForm.value.gender,
      "dob": this.getFormattedDate(this.personalDetailForm.value.dob),
      "mobileNumber": this.personalDetailForm.value.mobileNo,
      "emailId": this.personalDetailForm.value.emailId,
      "resDoorNo": this.residenceDetailForm.value.street,
      "resVillage": this.residenceDetailForm.value.village,
      "resCity": this.residenceDetailForm.value.city,
      "resDistrict": this.residenceDetailForm.value.district,
      "resState": this.residenceDetailForm.value.state,
      "resCountry": this.residenceDetailForm.value.country,
      "resZip": this.residenceDetailForm.value.pinCode,
      "comDoorNo": this.residenceDetailForm.value.street,
      "comVillage": this.residenceDetailForm.value.village,
      "comCity": this.residenceDetailForm.value.city,
      "comDistrict": this.residenceDetailForm.value.district,
      "comState": this.residenceDetailForm.value.state,
      "comCountry": this.residenceDetailForm.value.country,
      "comZip": this.residenceDetailForm.value.pinCode,
      "teamId": this.professionalDetailForm.value.teamName,
      "designationId": this.professionalDetailForm.value.designation,
      "qualifications": this.professionalDetailForm.value.qualifications,
      "previousDesignation": this.professionalDetailForm.value.PreviousDesignation,
      "previousEmployer": this.professionalDetailForm.value.PreviousEmployer,
      "previousExp": this.professionalDetailForm.value.PreviousExperience,
      "requirementType": this.professionalDetailForm.value.requirementType,
      "doj": this.getFormattedDate(this.professionalDetailForm.value.doj),
      "doc": this.getFormattedDate(this.professionalDetailForm.value.doc),
      "empType": this.professionalDetailForm.value.empType,
      "experience": this.professionalDetailForm.value.experience,
      "geography": this.professionalDetailForm.value.Geography,
      "workLocation": this.professionalDetailForm.value.Workloaction,
      "category": this.professionalDetailForm.value.Category,
      "fatherName": this.personalDetailForm.value.guardianName,
      "motherName": this.personalDetailForm.value.motherName,
      "employeeHusbandName": this.personalDetailForm.value.guardianName,
    }
        setTimeout(() => {
      this.updateRequest(updateemployee);
    }, 1000);
  }
  getFormattedDate(date: any): string {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const day = ('0' + dateObj.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }
  updateRequest(data: any) {
    this.restApi.update('api/web/v1/employee/update', data).subscribe(
      (resp: any) => {
        if (resp.respCode === 'HMS_00') {
          const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data);
          this.close(data)
        }
        if (resp.respCode !== 'HMS_00') {
          this.alertService.showFailedAlert(resp.respStatus, resp.message);
        }
      }, (err: any) => {
        
        if (err.respCode === 'HMS_01') {
          this.global.showAlert('404 Page Not Found', 'internal server error');
        }
      }
    )
  }

  ngOnInit(): void {
    this.initteamdetails();
    this.designation();
  }
  ngAfterViewInit(): void {
    this.updatevalue(this.data);
    this.cdRef.detectChanges();
  }

  checkEmptype() {
    if (this.empDetail.professionalDetail.empType) {
      console.log('Valid Emp Type: ' + this.empDetail.professionalDetail.empType);
    } else {
      console.log('Invalid Emp Type')
    }
  }

  close(data: any): void {
    this.bottomSheetRef.dismiss(data);
  }

  initCountryStateList() {
    this.rest.getCountryService().subscribe(
      (res: any) => {
        console.log('Successfully Got country state list');
        this.countryStateList = res;
        // this.residenceDetailForm.controls['country'].setValue('');

        this.filteredCountry = this.residenceDetailForm.controls['country'].valueChanges.pipe(
          startWith(''),
          map(value => this._filterCountry(value || '')),
        );
      }, (err: any) => {
        console.error('Got error while fetching country state list');
      }
    )
  }

  initteamdetails() {
    this.restApi.getService('api/web/v1/display/all/teamdetails',).subscribe(
      (resp: any) => {
        this.departmentList = resp.data;
      }, (err: any) => {
        
        if (err.respCode === 'HMS_01') {
          this.global.showAlert('404 Page Not Found', 'server internal error');
        }
      }
    );
  }

  designation() {
    this.restApi.getService('api/web/v1/display/all/designationDetail',).subscribe(
      (resp: any) => {
        this.desiganation = resp.data;
      }, (err: any) => {
        
        if (err.respCode === 'HMS_01') {
          this.global.showAlert('404 Page Not Found', 'server internal error');
        }
      }
    );
  }
  selectedTabIndex = 0;

  goToNextTab() {
    if (this.selectedTabIndex < 2) {  // 2 is the index of the last tab
      this.selectedTabIndex++;
    }
  }

  goToPreviousTab() {
    if (this.selectedTabIndex > 0) {
      this.selectedTabIndex--;
    }
  }
  private _filterState(value: string): string[] {
    const filterValue = value.toString().toLowerCase();

    return this.stateList.filter(st => st.toString().toLowerCase().includes(filterValue));
  }
  private _filterCountry(value: string): any[] {
    const filterValue = value.toString().toLowerCase();

    return this.countryStateList.filter((ct: any) => ct.name.toString().toLowerCase().includes(filterValue));
  }
  updateState(countryCode: any) {
    console.log('countryCode: ' + JSON.stringify(countryCode));
  }

  closeEmpDetail(event: MouseEvent) {
    this.onEmpDetailClosed.emit({});
    this._bottomsheetRef.dismiss();
    event.preventDefault();
  }
  changeActiveTab(tab: string) {
    this.activeTab = tab;
  }

  changeCommunicationAddress(ev: Event) {
    console.log(ev);
    if (Boolean(ev) === true) {
      this.showCommunicationAddress = false;
    } else {
      this.showCommunicationAddress = true;
    }
  }
  showPreviousExp = false;
  employmentTypeChanged(ev: any) {
    console.log('Emp type: ' + ev);
    if (String(ev) === 'FRESHER') {
      console.log('Set Experience to zero and disable field');
      this.professionalDetailForm.controls['experience'].setValue('0');
      this.disableExperience = true;
      this.showPreviousExp = false;

    } else {
      this.showPreviousExp = true;
      console.log('Enable experience field: ' + this.professionalDetailForm.controls['experience'].value);
      this.professionalDetailForm.controls['experience'].setValue('');
      this.disableExperience = false;
    }
  }
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  fileInputRef: HTMLInputElement | undefined;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    this.previewImage(file);
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  onDragLeave(event: any) {
    event.preventDefault();
  }

  onDrop(event: any) {
    event.preventDefault();
    const file: File = event.dataTransfer.files[0];
    this.selectedFile = file;
    this.previewImage(file);
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {

      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  openFileDialog() {
    if (this.fileInputRef) {
      this.fileInputRef.click();
    }
  }

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
