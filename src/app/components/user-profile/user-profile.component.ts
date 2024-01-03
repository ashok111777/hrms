import { DatePipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userid: string;
  profileForm: FormGroup;
  userDetails: any;
  isChecked: boolean;
  public useDefault:boolean = false;
  image: any;
  institutes: any;
  imagehide: boolean;
  updatebtm: boolean;
  showPassword: boolean = false;

  constructor(private global: GlobalService, private rest: RestService, private fb: FormBuilder, private sharedService: SharedService,
    private cdr: ChangeDetectorRef, private datePipe: DatePipe) {

  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public toggle(event: MatSlideToggleChange) {
    console.log('toggle', event.checked);
    this.useDefault = event.checked;
    if (event.checked == false) {
      this.isChecked = false;
    } else {
      this.isChecked = true;
    }
  }

  ngOnInit() {
    this.sharedService.getSharedData().subscribe(data => {
      this.userid = data?.userId;
    });
    this.InitForm();
    this.getprofileDetails();
    this.toggleEdit();
    this.getinst();
    this.checkPassword();
    this.imagehide = true;
  }

  InitForm() {
    this.profileForm = this.fb.group({
      userId: [''],
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', Validators.required],
      mobileNo: ['', Validators.required],
      dob: ['', Validators.required],
      profileId: [''],
      status: [''],
      empCode: [''],
      gender: [''],
      address: ['', Validators.required],
      institudeName: [''],
      image: [''],
      slide: [''],
      bio: ['', Validators.required],
      currentPassword: ['',],
      newPassword: ['', [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]],
      cnfPassword: ['',],
    });
  }
  checkPassword() {
    const cnfPasswordControl = this.profileForm.get('cnfPassword');
    if (cnfPasswordControl) {
      cnfPasswordControl.valueChanges.subscribe(() => {
        const newPassword = this.profileForm.get('newPassword')?.value;
        const cnfPassword = cnfPasswordControl.value;

        if (newPassword !== cnfPassword) {
          cnfPasswordControl.setErrors({ passwordMismatch: true });
        } else {
          cnfPasswordControl.setErrors(null);
        }
      });
    }
  }


  updateProfile() {
    if (this.profileForm.valid || this.image || this.profileForm.valid && this.image) {
      const formData = this.profileForm.value;
      formData.dob = this.datePipe.transform(formData.dob, 'yyyy-MM-dd');
      this.updateProfileWithImage(formData);
    } else {
      this.global.showAlert('Alert', 'please full the required input');
    }
  }

  async updateProfileWithImage(formData: any) {
    const formDataToSend = new FormData();

    // Append image file if available
    if (this.image) {
      const file = this.dataURItoBlob(this.image);
      formDataToSend.append('image', file, 'avatar.png');
    } else {
      // formDataToSend.append('image', this.photo);
      // Convert the URL to Blob
      const url = this.photo;
      const response = await fetch(url);
      const blob = await response.blob();
      formDataToSend.append('image', blob, 'avatar.png');
    }


    // Append form data excluding specific fields
    Object.keys(formData).forEach(key => {
      if (key !== 'slide' && key !== 'cnfPassword' && key !== 'currentPassword' && key !== 'newPassword') {
        formDataToSend.append(key, formData[key]);
      }
    });

    if (formData.slide) {
      formDataToSend.append('currentPassword', formData.currentPassword);
      formDataToSend.append('newPassword', formData.newPassword);
    }
    // Log FormData to the console
    

    // Make the API call with formDataToSend
    this.rest.putformdata('auth/web/v1/user/update', formDataToSend).subscribe(
      (resp: any) => {
        // Handle success
        if (resp.respCode === 'HMS_00') {
          if (formData.slide) {
            const dialogRef = this.global.showSuccessAlert('Success', 'Profile has Successfully Update Password');

          } else {
            const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data);
          }
          this.toggleEdit();
          this.getprofileDetails();
        }
        if (resp.respCode !== 'HMS_00') {
          this.global.showAlert(resp.respStatus, resp.message);
        }
      },
      (err: any) => {
        // Handle error
        
      }
    );
  }

  // ... (other class methods) ...

  private dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: 'image/png' });
  }

  convertToISODate(dateString: string): string {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  }



  getprofileDetails() {
    this.rest.getService('auth/web/v1/get/userId/' + sessionStorage.getItem('dummyUserId')).subscribe(
      (resp: any) => {
        this.userDetails = resp.data;
        this.profileForm.patchValue(this.userDetails);
        this.photo = this.userDetails.profileName;
        this.profileForm.patchValue({
          dob: new Date(this.convertToISODate(this.userDetails.dob)),
        });
      }, (err: any) => {
        
      })
  }

  close(data: any) {
    this.global.toggleRightPane();
  }
  toggleEdit() {
    this.toggleFormEnablement(!this.profileForm.disabled);
    this.updatebtm;
  }

  toggleFormEnablement(disable: boolean) {
    disable ? this.profileForm.disable() : this.profileForm.enable();
    disable ? this.imagehide = true : this.imagehide = false;
    disable ? this.updatebtm = true : this.updatebtm = false;

  }


  @ViewChild('avatarImg', { static: true }) avatarImgElement: ElementRef;

  @Input() photo: string;
  @Output() photoUpdated = new EventEmitter<string>();

  showAddPhotoOverlay: boolean;



  addPhoto(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/') && file.size <= 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarImgElement.nativeElement.src = reader.result;
        this.image = reader.result;
        this.cdr.detectChanges(); // Manually trigger change detection
      };
      reader.readAsDataURL(file);

      // // save the image in the back end database
      // // and get the photo url
      // this.photo = 'xxxx';
      // this.photoUpdated.emit(this.photo);
    }
    else {
      if (!file.type.startsWith('image/')) {
        // this.showToast('Please select an image file.'); 
      } else if (file.size > 1024 * 1024) {
        // this.showToast('Image size should be under 1MB.');
      }
    }

  }

  openFileInput(fileInput: { click: () => void; }) {
    fileInput.click()
    this.showAddPhotoOverlay = false
  }

  removePhoto() {
    this.avatarImgElement.nativeElement.src = '';
    this.photo = '';
    this.cdr.detectChanges(); // Manually trigger change detection
    this.photoUpdated.emit(this.photo);
  }


  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  getinst() {
    this.rest.getService('api/web/v1/get/institude/names').subscribe(
      (res: any) => {
        this.institutes = res.data;
      });
  }


}
