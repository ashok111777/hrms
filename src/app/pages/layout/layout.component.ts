import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MenuListService } from 'src/app/services/menu-list.service';
import { Menu } from '../../models/menu-model';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  opened = true;

  toggle(): void {
    this.opened = !this.opened;
  }

  menu: Menu;;
  userDetails:any;
  constructor(
    public loaderService: LoaderService,
    private menuService: MenuListService,
    public global: GlobalService
  ) { }

  ngOnInit(): void {
    this.menu = this.menuService.menuItems;
    this.userDetails = {
      firstName: 'Suryakant', lastName: 'Kumar', role: 'MANAGER', dob: new Date(), empCode: '891', mobile: '8083705398',
      emailId: 'suryakant@cashlinkglobal.com', company: 'CashLink Global Systems Pvt. Ltd.', branch: 'Egmore', address: 'Saidapet, Chennai, TN-15'
    };
  }

}
