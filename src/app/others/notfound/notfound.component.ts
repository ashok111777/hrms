import { Component } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent {
  constructor(private _location: Location, private router: Router) {}
  
  goBack() {
    this._location.back();
  }
  
  home() {
    this.router.navigateByUrl('/');
  }
}
