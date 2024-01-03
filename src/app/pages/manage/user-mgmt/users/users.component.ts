import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alerts.service';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  profiles: any;
  usercolums: string[] = ['profile', 'fullName', 'deleteicon'];
  userList: any;
  institutes: any;
  userForm: FormGroup;
  filteredObject: any;
  updateuser: boolean = false;
  @Input() name: any;
  filteredUserList: any[]; // Initialize it as an empty array
  searchInput: string = ''; // Initialize searchInput as an empty string
  // Add this property to your component
  selectedUser: any;
  admindiable: boolean = false;


  constructor(private fb: FormBuilder, private rest: RestService, public global: GlobalService, private datePipe: DatePipe, private sharedService: SharedService, public alert: AlertService) { }

  ngOnInit() {
    this.getUsers();
    this.getinst();
    this.getprofile();
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')]],
      mobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      dob: ['', [this.futureDateValidator(), Validators.required]],
      profileId: [, Validators.required],
      status: [''],
      empCode: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      institudeName: ['', Validators.required],
      userId: ['']
    });
    this.sharedService.resetUser$.subscribe(() => {
      this.resetUser();
    });
  }



  futureDateValidator() {
    return (control: FormControl) => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();
      if (selectedDate > currentDate) {
        return { futureDate: true }; // Validation fails
      }
      return null; // Validation succeeds
    };
  }

  convertToISODate(dateString: string): string {
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
  }

  getUsers() {
    this.rest.getService('auth/web/v1/display/allUsers').subscribe(
      (res: any) => {
        this.userList = res.data;
        this.userList.map((res: any) => {
          res.fullName = res.firstName + ' ' + res.lastName
        })
        this.filteredUserList = this.userList;
      });
  }

  getinst() {
    this.rest.getService('api/web/v1/get/institude/names').subscribe(
      (res: any) => {
        this.institutes = res.data;
      });
  }
  getprofile() {
    this.rest.getService('auth/web/v1/profiles').subscribe(
      (res: any) => {
        this.profiles = res.data;
      });
  }

  userlist(id: any, btnDisable: boolean) {
    btnDisable ? this.admindiable = true : this.admindiable = false
    this.selectedUser = id; // Set the selected user
    this.rest.getService('auth/web/v1/display/allUsers').subscribe(
      (res: any) => {
        this.filteredObject = res.data.filter((object: any) => object.userId === id)[0];
        this.userForm.patchValue(this.filteredObject);
        this.userForm.patchValue({
          // dob: moment(this.filteredObject.dob).format()
          dob: new Date(this.convertToISODate(this.filteredObject.dob)),
          //dob: new Date(this.convertToISODate(this.filteredObject.dob)),
        });
        this.updateuser = true;
      });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      formData.dob = this.datePipe.transform(formData.dob, 'yyyy-MM-dd');
      this.onsubmitformdata(formData);
    } else {
      this.global.showAlert('Alert', 'please full the required input');
    }
  }

  async onsubmitformdata(formData: any) {
    const formDataToSend = new FormData();

    // Append form data excluding specific fields
    Object.keys(formData).forEach(key => {
      if (key !== 'status' && key !== 'userId') {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Log FormData to the console
    // console.log('FormData:', formDataToSend);
    

    this.rest.postDataemp('auth/web/v1/create/user', formDataToSend).subscribe(
      (resp: any) => {
        if (resp.respCode === 'HMS_00') {
          const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data);
          this.getUsers();
          this.resetUser();
        }
        if (resp.respCode !== 'HMS_00') {
          this.global.showAlert(resp.respStatus, resp.message);
        }
      }, (err: any) => {
        
      }
    );
  }

  // async Update() {
  //   if (this.userForm.valid) {
  //     const formData = this.userForm.value;
  //     formData.dob = this.datePipe.transform(formData.dob, 'dd-MM-yyyy');
  //     this.updateRequest(formData)
  //   }
  //   else {
  //     this.alert.showFailedAlert("Please fill all the fields", 'Try again');
  //   }
  // }

  // updateRequest(data: any) {
  //   this.rest.update('auth/web/v1/user/update', data).subscribe(
  //     (resp: any) => {
  //       if (resp.respCode === 'HMS_00') {
  //         const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data);
  //         this.getUsers();
  //         this.resetUser();

  //       }
  //     }, (err: any) => {
  //       
  //       if (err.respCode === 'HMS_01') {
  //         this.global.showAlert('404 Page Not Found', 'Internal Server Error');
  //       }
  //     }
  //   )
  // }
  updateProfile() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      formData.dob = this.datePipe.transform(formData.dob, 'yyyy-MM-dd');
      this.updateProfileWithImage(formData);
    } else {
      this.global.showAlert('Alert', 'please full the required input');
    }
  }

  async updateProfileWithImage(formData: any) {
    const formDataToSend = new FormData();

    // Append form data excluding specific fields
    Object.keys(formData).forEach(key => {
      if (key !== 'slide' && key !== 'cnfPassword' && key !== 'currentPassword' && key !== 'newPassword') {
        formDataToSend.append(key, formData[key]);
      }
    });
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
        }
        if (resp.respCode !== 'HMS_00') {
          this.global.showAlert(resp.respStatus, resp.message);
        }
      },
      (err: any) => {
      }
    );
  }

  askForDeletion(empid: any) {
    const dialogRef = this.global.showCnfAlert('Alert', 'Do you want to delete this record?');
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Y') {
        this.deleteEmployee(empid);
      }
      if (result === 'N') {
        const dialogRef = this.global.showToast('you cancelled the request');
      };
    });
  }

  deleteEmployee(empid: any) {
    this.rest.putData('auth/web/v1/delete/user/' + empid).subscribe(
      (resp: any) => {
        if (resp.respCode === 'HMS_00') {
          const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data);
          this.getUsers();
          this.resetUser();
        }
      }, (err: any) => {
        
      }
    );
  }
  filterUsers() {
    if (this.searchInput.trim() === '') {
      this.filteredUserList = this.userList;
    } else {
      const filteredUsers = this.userList.filter((user: { fullName: string; emailId: string; }) => {
        return (
          user.fullName.toLowerCase().includes(this.searchInput.toLowerCase()) ||
          (user.emailId && user.emailId.toLowerCase().includes(this.searchInput.toLowerCase()))
        );
      });

      if (filteredUsers.length === 0) {
        // No matching users found, display a message
        this.filteredUserList = [{ fullName: 'No users found', emailId: '' }];
      } else {
        this.filteredUserList = filteredUsers;
      }
    }
  }

  close($event: MouseEvent) {
    // throw new Error('Method not implemented.');
  }

  resetUser() {
    this.userForm.reset(undefined);
    this.updateuser = false;
    this.selectedUser = '';
    this.searchInput = '';
    this.filteredUserList = this.userList;
  }

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }




}
