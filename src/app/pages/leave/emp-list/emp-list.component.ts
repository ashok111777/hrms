import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
export class EmpListComponent implements OnInit {
  institutes: string[] = ['CGS'];
  
  userForm = new FormGroup({
    empid: new FormControl('', [Validators.required, Validators.minLength(1)]),
    team: new FormControl('', [Validators.required,]),
    fullName: new FormControl('', [Validators.required, Validators.minLength(1)]),
    mobile: new FormControl('', [Validators.required, Validators.minLength(10)]),
    designation: new FormControl('', [Validators.required,]),
  });
  
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<any>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public user: any,
    public loaderService: LoaderService,
  ) {

    this.userForm.setValue({
      empid: user.empid,
      team: user.team,
      fullName: user.fullName,
      mobile: user.mobile,
      designation: user.designation,
    });

  }
  ngOnInit(): void {
    
  }
  close(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

