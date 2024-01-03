import { Platform } from '@angular/cdk/platform';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { MenuListService } from '../services/menu-list.service';
import { Menu } from '../models/menu-model';
import { GlobalService } from '../services/global.service';
import { RestService } from '../services/rest.service';
import { SharedService } from '../services/shared.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-layout-view',
  templateUrl: './layout-view.component.html',
  styleUrls: ['./layout-view.component.scss']
})

export class LayoutViewComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private idleTimer: any; // Add this line to declare the idleTimer property
  opened = true;
  mode: MatDrawerMode = "side";
  timer = 0;
  menu: Menu;
  userDetails: any;
  userid: string;
  profileid: string;
      constructor(
    public platform: Platform,
    public menuService: MenuListService,
    public global: GlobalService,
    private rest: RestService,
    private sharedService: SharedService,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef
  ) {

    this.sharedService.getSharedData().subscribe(data => {
      this.userid = data?.userId;
      this.profileid = data?.profileId;
    });
        setInterval(() => {
      this.timer += 1;
    }, 1000);

    if (this.platform.ANDROID || this.platform.IOS) {
      this.mode = 'push';
      this.opened = false;
    }

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    clearTimeout(this.idleTimer);
  }




  ngOnInit(): void {
    //this.menu = this.menuService.menuItems;
    this.getuserDetails();
    this.menuList();
  }

  menuList() {
    this.rest.getService('auth/web/v1/application/menus/' + sessionStorage.getItem('dummyprofileId')).subscribe(
      (res: any) => {
        this.menu = res.data;
        this.menu.map((res: any) => {
          res.color = '#283593'
        });
        this.menu.map((res: any) => {
          res.title = res.menuGroupName;
          res.subMenu = res.menus
          res.menuId = res.id
          res.menus.map((item: any) => {
            item.link = item.url;
            item.title = item.name;
            item.menuId = item.id
          });
        })
    });
  }

  getuserDetails() {
    this.rest.getService('auth/web/v1/get/userId/' + sessionStorage.getItem('dummyUserId')).subscribe(
      (resp: any) => {
        this.userDetails = resp.data;
      }, (err: any) => {
        
      }
    )
  }

  toggle(): void {
    this.opened = !this.opened;
  }


  
}
