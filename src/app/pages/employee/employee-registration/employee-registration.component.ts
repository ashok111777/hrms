import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { Employee } from 'src/app/models/Employee';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RestService } from 'src/app/services/rest.service';
import { AlertService } from 'src/app/services/alerts.service';

import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatStepper } from '@angular/material/stepper';
import { ReferComponent } from 'src/app/components/refer/refer.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.scss']
})
export class EmployeeRegistrationComponent implements OnInit {
  stateList: string[] = ['Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Orissa', 'Pondicherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Tripura', 'Uttaranchal', 'Uttar Pradesh', 'West Bengal'];
  filteredOptions: Observable<string[]> | undefined;
  empId: any;
  state = new FormControl('');
  departmentList: any;
  employee: Employee = {};
  showPreviousExp = false;
  desiganation: any;
  disableExperience: boolean = false;
  showCommunicationAddress: boolean = true;
  postion: any = 'left'
  ButtonDisabled: boolean = false;
  isEditable: boolean = true;



  personalDetailForm = new FormGroup({
    firstName: new FormControl('', [Validators.required,]),
    lastName: new FormControl('', [Validators.required,]),
    emailId: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')]),
    mobileNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern('^[0-9]*$')]),
    gender: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    fatherName: new FormControl('', Validators.required),
    motherName: new FormControl('', Validators.required),
    employeeId: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
  });
  residenceDetailForm = new FormGroup({
    resDoorNo: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    resVillage: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    resCity: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    resDistrict: new FormControl('', Validators.required),
    resState: new FormControl('', Validators.required),
    resCountry: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])),
    resZip: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]*$')]),
    residentialAddressCheck: new FormControl(false),
    comDoorNo: new FormControl('', [Validators.maxLength(20)]),
    comVillage: new FormControl('', [Validators.maxLength(50)]),
    comCity: new FormControl('', [Validators.maxLength(50)]),
    comDistrict: new FormControl('',),
    comState: new FormControl('',),
    comCountry: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])),
    comZip: new FormControl('', [Validators.maxLength(6), Validators.pattern('^[0-9]*$')]),
  });
  professionalDetailForm = new FormGroup({
    teamId: new FormControl('', Validators.required),
    designationId: new FormControl('', Validators.required),
    qualifications: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[A-Za-z_./#&+-]*'), Validators.maxLength(13)])),
    previousEmployer: new FormControl(''),
    previousDesignation: new FormControl(''),
    previousExp: new FormControl(''),
    doj: new FormControl('', Validators.required),
    doc: new FormControl('', Validators.required),
    empType: new FormControl('', Validators.required),
    experience: new FormControl('', Validators.required),
    geography: new FormControl('', Validators.required,),
    workLocation: new FormControl('', Validators.required),
    requirementType: new FormControl('', Validators.required),
    Category: new FormControl('', Validators.required),
  });

  imagedetailsform = new FormGroup({
    image: new FormControl('', [Validators.required])
  })
  isButtonDisabled: boolean;

  addValidator() {
    this.imagedetailsform.controls.image.addValidators([Validators.required]);
    this.imagedetailsform.controls.image.setErrors(Validators.required);
    this.imagedetailsform.controls.image.setValidators(Validators.required);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 1000 });
  }

  removeValidator(stepper: MatStepper) {
    this.isButtonDisabled = true;
    if (this.selectedImage) {
      this.imagedetailsform.controls.image.clearValidators();
      this.imagedetailsform.controls.image.setErrors(null);
      this.imagedetailsform.controls.image.setValidators(null);
      setTimeout(() => {
        this.onSubmit(stepper);
      }, 200);
    }
    else {
      this.openSnackBar('image should be mandatory', 'Close')
      this.isButtonDisabled = false;

    }
  }


  constructor(
    private _snackBar: MatSnackBar,
    public global: GlobalService,
    public restApi: RestService,
    private alertService: AlertService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {

    this.professionalDetailForm.get('doj')?.valueChanges.subscribe(() => {
      this.updateDateOfConfirmation();
    });

    this.professionalDetailForm.get('empType')?.valueChanges.subscribe(() => {
      this.updateDateOfConfirmation();
    });

    // Initialize the "Date of Confirmation" based on the initial values
    this.updateDateOfConfirmation();

  }

  updateDateOfConfirmation() {
    const dojValue = this.professionalDetailForm.get('doj')?.value;
    const empType = this.professionalDetailForm.get('empType')?.value;

    if (dojValue) {
      const dojDate = new Date(dojValue);

      if (empType === 'FRESHER') {
        dojDate.setMonth(dojDate.getMonth() + 12); // Add 12 months
      } else if (empType === 'EXPERIENCE') {
        dojDate.setMonth(dojDate.getMonth() + 6); // Add 6 months
      }

      this.professionalDetailForm.get('doc')?.setValue(dojDate.toISOString());
    }
  }


  ngOnInit(): void {
    // const stateName= this.registerForm.controls['state'].value;
    this.filteredOptions = this.residenceDetailForm.controls['resState'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterState(value || '')),
    );
    this.initDepartment();
    this.designation();
  }
  private _filterState(value: string): string[] {
    const filterValue = value.toString().toLowerCase();

    return this.stateList.filter(st => st.toString().toLowerCase().includes(filterValue));
  }

  designation() {
    this.restApi.getService('api/web/v1/display/all/designationDetail').subscribe(
      (resp: any) => {
        this.desiganation = resp.data;
      }, (err: any) => {
        
      }
    )

  }

  initDepartment() {
    this.restApi.getService('api/web/v1/display/all/teamdetails').subscribe(
      (resp: any) => {
        this.departmentList = resp.data;
      }, (err: any) => {
        
      }
    )
  }

  onSubmit(stepper: MatStepper) {
    if (
      this.personalDetailForm.valid &&
      this.residenceDetailForm.valid &&
      this.professionalDetailForm.valid &&
      this.selectedImage
    ) {
      let formData: FormData = new FormData();
      formData.append('firstName', this.personalDetailForm.value.firstName || '');
      formData.append('lastName', this.personalDetailForm.value.lastName || '');
      formData.append('emailId', this.personalDetailForm.value.emailId || '');
      formData.append('mobileNumber', this.personalDetailForm.value.mobileNumber || '');
      formData.append('gender', this.personalDetailForm.value.gender || '');
      formData.append('dob', this.getFormattedDate(this.personalDetailForm.value.dob) || '');
      formData.append('fatherName', this.personalDetailForm.value.fatherName || '');
      formData.append('motherName', this.personalDetailForm.value.motherName || '');
      formData.append('employeeId', this.personalDetailForm.value.employeeId || '');
      formData.append('resDoorNo', this.residenceDetailForm.value.resDoorNo || '');
      formData.append('resVillage', this.residenceDetailForm.value.resVillage || '');
      formData.append('resCity', this.residenceDetailForm.value.resCity || '');
      formData.append('resDistrict', this.residenceDetailForm.value.resDistrict || '');
      formData.append('resState', this.residenceDetailForm.value.resState || '');
      formData.append('resCountry', this.residenceDetailForm.value.resCountry || '');
      formData.append('resZip', this.residenceDetailForm.value.resZip || '');
      formData.append('comDoorNo', this.residenceDetailForm.value.comDoorNo || '');
      formData.append('comVillage', this.residenceDetailForm.value.comVillage || '');
      formData.append('comCity', this.residenceDetailForm.value.comCity || '');
      formData.append('comDistrict', this.residenceDetailForm.value.comDistrict || '');
      formData.append('comState', this.residenceDetailForm.value.comState || '');
      formData.append('comCountry', this.residenceDetailForm.value.comCountry || '');
      formData.append('comZip', this.residenceDetailForm.value.comZip || '');
      formData.append('teamId', this.professionalDetailForm.value.teamId || '');
      formData.append('designationId', this.professionalDetailForm.value.designationId || '');
      formData.append('qualifications', this.professionalDetailForm.value.qualifications || '');
      formData.append('previousEmployer', this.professionalDetailForm.value.previousEmployer || '');
      formData.append('previousDesignation', this.professionalDetailForm.value.previousDesignation || '');
      formData.append('previousExp', this.professionalDetailForm.value.previousExp || '');
      formData.append('doj', this.getFormattedDate(this.professionalDetailForm.value.doj) || '');
      formData.append('doc', this.getFormattedDate(this.professionalDetailForm.value.doc) || '');
      formData.append('empType', this.professionalDetailForm.value.empType || '');
      formData.append('experience', this.professionalDetailForm.value.experience || '');
      formData.append('geography', this.professionalDetailForm.value.geography || '');
      formData.append('workLocation', this.professionalDetailForm.value.workLocation || '');
      formData.append('requirementType', this.professionalDetailForm.value.requirementType || '');
      formData.append('Category', this.professionalDetailForm.value.Category || '');
      if (typeof this.selectedImage === 'string') {
        formData.append('image', this.dataURItoBlob(this.selectedImage), 'image.jpg');
      }

      setTimeout(() => {
        this.sendRequest(formData, stepper);
        formData.forEach((value, key) => {
          console.log(key + " " + value)
        });
        this.empId = this.personalDetailForm.value.employeeId;
      }, 1000);
    }

  }


  sendRequest(data: FormData, stepper: MatStepper) {
    this.restApi.postDataemp('api/web/v1/add/employee/image', data).subscribe(
      (resp: any) => {
        if (resp.respCode === 'HMS_00') {
          stepper.next();
          this.isEditable = false;
          // const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data);
        }
        if (resp.respCode !== 'HMS_00') {
          this.alertService.showFailedAlert(resp.respStatus, resp.message);
          this.addValidator();
          this.isButtonDisabled = false;
        }
      },
      (err: any) => {
        
        this.isButtonDisabled = false;
        this.addValidator();
        if (err.respCode === 'HMS_01') {
          this.alertService.showAlert('404 Page Not Found', 'Internal server error');
        }
      }
    );
  }

  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
  showToast(msg: string) {
    this._snackBar.open(msg, 'Dismiss', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 1000
    });
  }

  selectedImage: string | ArrayBuffer | null = null;

  @ViewChild('fileInput')
  fileInput!: ElementRef;

  openFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/') && file.size <= 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.cdr.detectChanges(); // Manually trigger change detection
      };
      reader.readAsDataURL(file);
    }
    else {
      if (!file.type.startsWith('image/')) {
        this.showToast('Please select an image file.'); 
      } else if (file.size > 1024 * 1024) {
        this.showToast('Image size should be under 1MB.');
      }
    }
  }
 


  employmentTypeChanged(ev: Event) {
    console.log('Emp type: ' + ev);
    if (String(ev) === 'FRESHER') {
      console.log('Set Experience to zero and disable field');
      this.professionalDetailForm.controls['experience'].setValue('0');
      this.disableExperience = true;
      this.showPreviousExp = false;
    } else {
      this.showPreviousExp = true;
      console.log('Enable experience field: ' + this.professionalDetailForm.controls['empType'].value);
      this.professionalDetailForm.controls['empType'].setValue('EXPERIENCE');
      this.professionalDetailForm.controls['experience'].setValue('');

      this.disableExperience = false;
    }
  }

  changeCommunicationAddress(ev: Event) {
    const isResidentialAddressSame = Boolean(ev);

    if (isResidentialAddressSame) {
      this.showCommunicationAddress = false;
      const residenceDetailFormValue = this.residenceDetailForm.value;

      this.residenceDetailForm.patchValue({
        comDoorNo: residenceDetailFormValue.resDoorNo,
        comVillage: residenceDetailFormValue.resVillage,
        comCity: residenceDetailFormValue.resCity,
        comDistrict: residenceDetailFormValue.resDistrict,
        comState: residenceDetailFormValue.resState,
        comCountry: residenceDetailFormValue.resCountry,
        comZip: residenceDetailFormValue.resZip
      });
    } else {
      this.showCommunicationAddress = true;
    }
  }

  getFormattedDate(date: any): string {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const day = ('0' + dateObj.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  onboard() {
    const dialogRef = this.dialog.open(
      ReferComponent, {
      panelClass: 'custom-mdoel',
      closeOnNavigation: true,
      hasBackdrop: true,
      disableClose: true
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log(' Data: ' + result.data);
    });
  }

  get currentDate() {
    var date = new Date().toISOString();
    return date;
  }
  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}

