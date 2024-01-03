import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProfileDetailComponent } from 'src/app/components/profile-detail/profile-detail.component';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';
import {MatBottomSheet, MatBottomSheetConfig, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { ProfileType } from 'src/app/models/profile-details';
import { UserService } from 'src/app/services/user.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-profile-mgmt',
  templateUrl: './profile-mgmt.component.html',
  styleUrls: ['./profile-mgmt.component.scss']
})
export class ProfileMgmtComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  profileList: ProfileType[] = [];
  dataSource:MatTableDataSource<ProfileType>;
  selectedTab: string = '0';
  tabLabel: string = 'Designation List';
  designationColumns: string[] = ['id', 'name', 'description', 'createdBy', 'actions'];
  designationFormGroup = new FormGroup({
    desigName: new FormControl('', [Validators.required,]),
    description: new FormControl('', [Validators.required,]),
  });
  constructor(
    private rest: RestService,
    public dialog: MatDialog,
    public global:GlobalService,
    private _bottomSheet: MatBottomSheet,
    private userService:UserService,
    public loaderService: LoaderService,

  ) {
    this.getProfile();
  }

  ngOnInit(): void {
    this.initProfileType();
  }
  initProfileType() {
    this.userService.profileTypeList=[
      {id:'SUPERADMIN', name: 'Super Admin', description:''}
    ];
  }
  filterProfile(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  async getProfile() {
    this.rest.getService('').subscribe(
      (res: any) => {
        this.profileList = res.profiles;
        this.dataSource = new MatTableDataSource<ProfileType>(res.profiles);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (err: any) => {
        console.log('Got Error: ' + JSON.stringify(err));
      }
    );
  }
  tabChanged(ev: any) {
    console.log(ev.selectedIndex);
    if (ev.selectedIndex == 0) {
      this.tabLabel = 'Designation List';
    } else if (ev.selectedIndex == 1) {
      this.tabLabel = 'Add New Designation';
    }
  }
  showDetails(data:any, mode: string): void {
    data.mode=mode;
    const config: MatBottomSheetConfig = {
      hasBackdrop:true,
      disableClose: true,
      panelClass: 'bottom-sheet-container',
      closeOnNavigation: true,
      ariaLabel: 'Add New Profile'
    }
    this._bottomSheet.open(ProfileDetailComponent, config);
   
  }
  
}

