import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';
import { designationListClass, productListClass, userListClass } from 'src/app/models/Employee';
import { AlertService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-policy-config',
  templateUrl: './policy-config.component.html',
  styleUrls: ['./policy-config.component.scss']
})
export class PolicyConfigComponent {
  configForm: any = FormGroup
  designationList: [designationListClass];
  productList: [productListClass];
  userList: [userListClass];
  selectedList: any = [];
  leaveNotifUsers: any = [];
  wfhNotifUsers: any = [];
  probNotifUsers: any = [];
  lateComeNotifUsers: any = [];
  days: number[] = [1, 2];
  enableEdit: boolean = false;

  constructor(
    private rest: RestService,
    private global: GlobalService,
    private alertService: AlertService,
    private fb: FormBuilder
  ) { }
  ngOnInit() {
    this.InitForm();
    this.getDesignation();
  }
  editSettings(mode: string) {
    if (mode === 'E') {
      this.enableEdit = true;
    }
    else {
      this.getCurrentSettings();  
      this.enableEdit = false;
    }
  }
  InitForm() {
    this.configForm = this.fb.group({
      id: ['1'],
      inTime: ['', Validators.required],
      outTime: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      range: ['', Validators.required],
      tlId: ['', Validators.required],
      plId: ['', Validators.required],
      managerId: ['', Validators.required],
      products: [, Validators.required],
      leaveEligiblity: ['', Validators.required],
      leaveNotificationUser: [, Validators.required],
      wfhNotificationUser: [, Validators.required],
      probationNotificationUser: [, Validators.required],
      lateComeNotificationUser: [, Validators.required]
    });
  }

  getDesignation() {
    this.rest.getService('api/web/v1/display/all/designationDetail',).subscribe(
      (resp: any) => {
        if (resp.respCode === 'HMS_00') {
          this.designationList = resp.data;
          this.getProductList();
        } else {
          this.alertService.showFailedAlert(resp.respCode, resp.respStatus);
        }
      }, (err: any) => {
        
        if (err.respCode === 'HMS_01') {
          this.global.showAlert('404 Page Not Found', 'server internal error');
        }
      }
    );
  }
  getProductList() {
    this.rest.getService('api/web/v1/display/all/teamdetails',).subscribe(
      (resp: any) => {
        if (resp.respCode === 'HMS_00') {
          this.productList = resp.data;
          this.getUserList();
        } else {
          this.alertService.showFailedAlert(resp.respCode, resp.respStatus);
        }
      }, (err: any) => {
        
        if (err.respCode === 'HMS_01') {
          this.global.showAlert('404 Page Not Found', 'server internal error');
        }
      }
    );
  }
  getUserList() {
    this.rest.getService('auth/web/v1/display/allUsers',).subscribe(
      (resp: any) => {
        if (resp.respCode === 'HMS_00') {
          this.userList = resp.data;
          this.getCurrentSettings();
        } else {
          this.alertService.showFailedAlert(resp.respCode, resp.respStatus);
        }
      }, (err: any) => {
        
        if (err.respCode === 'HMS_01') {
          this.global.showAlert('404 Page Not Found', 'server internal error');
        }
      }
    );
  }

  getSelectedList(event: any) {
    this.selectedList = event.map((res: any) => {
      return this.productList.filter(item => item.id === res)[0];
    });
  }
  getSelectedUserList(event: any, notifType: string) {
    if (notifType === 'LEAVE') {
      this.leaveNotifUsers = event.map((res: any) => {
        return this.userList.filter(user => user.userId === res)[0];
      });
    } else if (notifType === 'WFH') {
      this.wfhNotifUsers = event.map((res: any) => {
        return this.userList.filter(user => user.userId === res)[0];
      });
    } else if (notifType === 'PROB') {
      this.probNotifUsers = event.map((res: any) => {
        return this.userList.filter(user => user.userId === res)[0];
      });
    } else {
      this.lateComeNotifUsers = event.map((res: any) => {
        return this.userList.filter(user => user.userId === res)[0];
      });
    }
  }
  updateSettings() {
    let inTime: number[] = (this.configForm.controls['inTime'].value).split(":");
    let outTime: number[] = (this.configForm.controls['outTime'].value).split(':');
    const inTimehour = inTime[0].toLocaleString('en-US', { minimumIntegerDigits: 2 })
    const outTimehour = outTime[0].toLocaleString('en-US', { minimumIntegerDigits: 2 })
    this.configForm.controls['inTime'].setValue(inTimehour + ':' + inTime[1] + ':' + '00');
    this.configForm.controls['outTime'].setValue(outTimehour + ':' + outTime[1] + ':' + '00');
    
    const postData = this.configForm.value;
    this.rest.update('api/web/v1/update/userSettings', postData).subscribe((resp: any) => {
      if (resp.respCode === 'HMS_00') {
        this.alertService.displaySuccessAlert('Your Settings have been Configured Successfully');
        this.getCurrentSettings();
        this.enableEdit = false;
      } else {
        this.alertService.showFailedAlert(resp.respCode, resp.respStatus);
      }
    }, (err: any) => {
      
      if (err.respCode === 'HMS_01') {
        this.global.showAlert('404 Page Not Found', 'server internal error');
      }
    });
  }

  getCurrentSettings() {
    this.rest.getService('api/web/v1/userSetting').subscribe((resp: any) => {
      if (resp.respCode === 'HMS_00') {
        this.configForm.patchValue(resp.data);
        let inTime: number[] = (this.configForm.controls['inTime'].value).split(":");
        let outTime: number[] = (this.configForm.controls['outTime'].value).split(':');
        const inTimehour = inTime[0].toLocaleString('en-US', { minimumIntegerDigits: 2 })
        const outTimehour = outTime[0].toLocaleString('en-US', { minimumIntegerDigits: 2 })
        this.configForm.controls['inTime'].setValue(inTimehour + ':' + inTime[1]);
        this.configForm.controls['outTime'].setValue(outTimehour + ':' + outTime[1]);
        
        this.getSelectedList(resp.data.products);
        this.getSelectedUserList(resp.data.leaveNotificationUser, 'LEAVE');
        this.getSelectedUserList(resp.data.wfhNotificationUser, 'WFH');
        this.getSelectedUserList(resp.data.probationNotificationUser, 'PROB');
        this.getSelectedUserList(resp.data.lateComeNotificationUser, '');
      }
    });
  }

  validate(event: any) {
    const keyPressed = String.fromCharCode(event.keyCode);
    let regex = /^[0-9\.]*$/;
    // validating the key pressed 
    if (!regex.test(keyPressed)) event.preventDefault();
  }
}
