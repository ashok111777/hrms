import { Component, OnInit, ViewChild } from '@angular/core';
import { ChangeDetectionStrategy, Input } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Menu } from 'src/app/models/menu-model';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger | undefined;
  @Input() menu: Menu | undefined;
  menuNum = 0;
  activeMenu: string = '';

  constructor() { }

  ngOnInit(): void {}
  setMenuNum(num: number, menuId: any) {
    this.menuNum = num;
    this.activeMenu = menuId;
   
  }
}