import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from 'src/app/services/rest.service';
import { ParentMenu } from './roles.model';
import { SharedService } from 'src/app/services/shared.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {

  dataSource: MatTableDataSource<any>;
  userForm: FormGroup;
  userList: any;
  userdepartment: any;
  departmentList: any[] = [];
  allComplete: boolean;
  roleForm: FormGroup;
  menuList: any;
  submenuid: any[] = [];
  iddata: any;
  userId: any;
  profileMenu: ParentMenu[];
  searchQuery: string = ''; // Variable to store the search query
  selectedItemId: number | null = null; // Variable to store the ID of the selected item
  buttonDisable: boolean = false

  constructor(private fb: FormBuilder, private rest: RestService, public global: GlobalService, private sharedService: SharedService) { }

  ngOnInit() {
    this.initForm();
    this.getUsers();
    this.getDepartment();
    this.gerroles();
    this.sharedService.resetUser$.subscribe(() => {
      this.addRolses();
    });
  }

  initForm() {
    this.roleForm = this.fb.group({
      profileName: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  gerroles() {
    this.rest.getService('auth/web/v1/profile/group-menus/menus').subscribe(
      (res: any) => {
        this.menuList = res.data;
        this.menuList.map((item: any) => {
          item.selected = false;
          item.menus.map((element: any) => {
            element.selected = false;
          })
        })
        console.log(this.menuList);
      })
  }

  addRolses() {
    this.roleForm.reset();
    this.reset();
    this.selectedItemId = 0;
    this.userId = '';
    this.searchQuery = '';
    this.buttonDisable = false;
  }

  getUsers() {
    this.rest.getService('auth/web/v1/display/allUsers').subscribe(
      (res: any) => {
        this.userList = res.data;
        this.userList.map((res: any) => {
          res.fullName = res.firstName + ' ' + res.lastName
        })
        this.dataSource = new MatTableDataSource<any>(this.userList);
      });
  }

  inputCheck(event: any) {
    console.log(event.target);
  }

  getDepartment() {
    this.rest.getService('auth/web/v1/profiles').subscribe(
      (res: any) => {
        this.departmentList = res.data;
        console.log(this.departmentList);
      });
  }

  

  selectRole(item: any) {
    console.log(item);
  }

  savefn(item: any) {
    console.log(item.target.id);
  }

  showDetails(item: any, actions: string) {
    console.log(item, actions)
  }

  isIndeterminate(item: any): boolean {
    const dashboardSubtasks = item.menus;
    const checkedCount = dashboardSubtasks.filter((subtask: { selected: any; }) => subtask.selected).length;
    return checkedCount > 0 && checkedCount < dashboardSubtasks.length;
  }

  checkDashboardSubtask(item: any) {
    const dashboardSubtasks = item.menus;
    // Determine if the "Dashboard" checkbox should be in an indeterminate state
    const isIndeterminate = dashboardSubtasks.some((subtask: { selected: any; }) => subtask.selected);
    const isAllChecked = dashboardSubtasks.every((subtask: { selected: any; }) => subtask.selected);
    item.selected = isAllChecked ? true : isIndeterminate;
  }

  toggleDashboardSubtasks(item: any) {
    const dashboardSubtasks = item.menus;
    const isDashboardChecked = item.selected;
    // Check or uncheck subtasks based on the state of the "Dashboard" checkbox
    for (const subtask of dashboardSubtasks) {
      subtask.selected = isDashboardChecked;
    }
  }

  // Function to select all checkboxes
  selectAll() {
    for (const item of this.menuList) {
      item.selected = true;
      for (const subtask of item.menus) {
        subtask.selected = true;
      }
    }
    this.allComplete = true;
  }

  // Function to uncheck all checkboxes
  reset() {
    for (const item of this.menuList) {
      item.selected = false;
      for (const subtask of item.menus) {
        subtask.selected = false;
      }
    }
    this.allComplete = false;
  }

  roleUpdate() {
    if (this.roleForm.valid) {
      console.log(this.userId);
      this.iddata = this.menuList.map((res: any) => {
        res.menus.map((item: any) => {
          this.submenuid.push(item);
        })
      })
      const data1 = this.submenuid.filter((element: any) => element.selected === true)
      const idGet = data1.map((item: any) => { return item.id })
      const data = this.roleForm.getRawValue();
      data.roles = idGet;
      if (this.userId) {
        this.rest.update('auth/web/v1/profile/' + this.userId, data).subscribe(
          (resp: any) => {
            if (resp.respCode === 'HMS_00') {
              console.log('it working');
              
              const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data);
              this.getDepartment()
              this.addRolses();
            }
            if (resp.respCode !== 'HMS_00') {
              this.global.showAlert(resp.respStatus, resp.message);
            }

          }, (err: any) => {
            
          })
      } else {
        this.rest.postDatanewuser('auth/web/v1/profile', data).subscribe((resp: any) => {
          if (resp.respCode === 'HMS_00') {
            console.log('it working');
            const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data);
            this.getDepartment()
            this.addRolses();
          }
          if (resp.respCode !== 'HMS_00') {
            this.global.showAlert(resp.respStatus, resp.message);
          }
          this.getDepartment();
          this.addRolses();
        });
      }
    }
  }

  editprofile(item: any) {
    this.userId = item.id;
    item.admin ? this.buttonDisable = true : this.buttonDisable = false;
    this.rest.getService(`auth/web/v1/profiles/${item.id}/selected/roles`).subscribe(
      (res: any) => {
        var tempresp: any = res.data.permissions;
        tempresp.map((item: any) => {
          item.selected = false
        })
        for (var i = 0; i < tempresp.length; i++) {
          var childLengh = tempresp[i].menus.length;
          var childSelected = 0;
          for (var j = 0; j < tempresp[i].menus.length; j++) {
            if (tempresp[i].menus[j].selected) {
              childSelected += 1;
            }
          }
          if (childLengh == childSelected) {
            tempresp[i].selected = true;
          }
          else if (childSelected > 0) {
            tempresp[i].selected = false;
          }
        }
        this.menuList = tempresp;
        this.roleForm.patchValue({
          profileName: res.data.profileName,
          description: res.data.description,
        });
      });
  }


  askForDeletion(list: any) {
    const dialogRef = this.global.showCnfAlert('Alert', 'Do you want to delete this record?');
    dialogRef.afterClosed().subscribe(result => {
      console.log('Alert Data: ' + result);
      if (result === 'Y') {
        this.deleteList(list);
      }
      if (result === 'N') {
        const dialogRef = this.global.showToast('you cancelled the request');
      };
    });
  }

  deleteList(list: any) {
    console.log(list.id);
    this.rest.deleteData(`auth/web/v1/profile/${list.id}?force=true`).subscribe(
      (resp: any) => {
        this.getDepartment();
        this.addRolses();
        const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data);
      }, (err: any) => {
        
      })
  }

  filterList() {
    return this.departmentList.filter(item => {
      return item.profileName.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }

  onItemClick(itemId: number) {
    this.selectedItemId = itemId;
  }
}