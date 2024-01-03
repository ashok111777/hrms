import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { RestService } from "src/app/services/rest.service";
import { SharedService } from "src/app/services/shared.service";
@Component({
  selector: 'app-user-mgmt',
  templateUrl: './user-mgmt.component.html',
  styleUrls: ['./user-mgmt.component.scss']
})
export class UserMgmtComponent {
  headertxt: any;
  selectedTabIndex = 0; // Initialize with the index of the default tab
  profiles: string[] = ['HR', 'ADMIN', 'MANAGER'];
  usercolums: string[] = ['profile', 'fullName', 'deleteicon'];
  userList: any;
  institutes: any;
  navLinks: any[];
  activeLinkIndex = -1;
  tabheader: string = 'Users';
  name: string;
  activeTab: string = 'Users'; // Initialize with the default tab



  constructor(private fb: FormBuilder, private rest: RestService, private router: Router, public dialog: MatDialog,private sharedService: SharedService) {
    this.navLinks = [
      {
        label: 'Users',
        link: './users',
        index: 0
      }, {
        label: 'Roles',
        link: './roles',
        index: 1
      },
    ];

  }

  ngOnInit() {
    this.getUsers();
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

  getUsers() {
    this.rest.getService('auth/web/v1/display/allUsers').subscribe(
      (res: any) => {
        this.userList = res.data;
        this.userList.map((res: any) => {
          res.fullName = res.firstName + ' ' + res.lastName
        })
      });
  }

  savefn(item: any) {
    console.log(item.target.id);
  }

  routetab(item: any) {
    console.log(item);
    this.tabheader = item;
    this.activeTab = item;
  }

  triggerResetUserInUsersComponent() {
    this.sharedService.triggerResetUser();
  }

  addUser() {
    // ... code to add a new user
    // Trigger the reset function in UsersComponent
    this.triggerResetUserInUsersComponent();
  }
  
  addroles(){
    this.triggerResetUserInUsersComponent();
  }

}


