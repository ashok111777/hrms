import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { LoaderService } from 'src/app/services/loader.service';
import { MenuListService } from 'src/app/services/menu-list.service';
import { ProfileDetails } from '../../models/profile-details';
import { Menu, MenuItem } from 'src/app/models/menu-model';
@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  profileForm = new FormGroup({
    profileName: new FormControl('', [Validators.required,]),
    description: new FormControl('', [Validators.required,]),
  })
  menus: Menu;
  allComplete: boolean;

  constructor(private _bottomSheetRef: MatBottomSheetRef<ProfileDetailComponent>,
    public loaderService: LoaderService,
    private menuService: MenuListService) { }
  profileType: ProfileDetails;
  
  ngOnInit(): void {
    this.menus = this.menuService.menuItems;
  }

  close(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    // event.preventDefault();
  }

  setAllSubMenu(checked: boolean, menu: any) {
    console.log(checked);
    menu.subMenu.forEach((sm: any) => (sm.checked = checked));
  }
  
  setAll(checked: boolean) {
    console.log('checked: ' + checked);
    this.allComplete = checked;
    this.menus.forEach((m: any) => {
      m.checked = checked;
      console.log('m: ' + m.checked);
      m.subMenu.forEach((sm: any) => {
        sm.checked = checked;
        console.log('sm: ' + sm.checked);
      });
    });
    /* if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed)); */
  }
  updateAllComplete() {
    // this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }
}
