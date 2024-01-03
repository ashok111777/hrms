import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Input } from '@angular/core';
import { Menu } from '../../../models/menu-model';
@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemComponent implements OnInit {
  @Input() menu: Menu = [];
  menuNum=0;
  activeMenu: string='';
  constructor() { }

  ngOnInit(): void {
  }
  setMenuNum(num:number, menuId:any){
    this.menuNum=num;
    this.activeMenu=menuId;
    console.log('Active Menu: ' + menuId);
  }
}
