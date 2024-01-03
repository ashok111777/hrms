import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-leavedetail-list',
  templateUrl: './leavedetail-list.component.html',
  styleUrls: ['./leavedetail-list.component.scss']
})
export class LeavedetailListComponent implements OnInit {

  leaveForm = new FormGroup({
    leaveid: new FormControl('', [Validators.required]),
    teamName: new FormControl('', [Validators.required]),
    fullname: new FormControl('', [Validators.required]),
    applyDate: new FormControl('', [Validators.required]),
    leaveStatus: new FormControl('', [Validators.required]),
    leaveType: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endingDate: new FormControl('', [Validators.required]),
    approvedBy: new FormControl('', [Validators.required]),
    approvedDate: new FormControl('', [Validators.required]),
    lop: new FormControl('', [Validators.required]),
    withoutLop: new FormControl('', [Validators.required]),
    officialLeave: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    leavebalance: new FormControl('', [Validators.required]),
  });

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<LeavedetailListComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public user: any,
  ) {
    this.leaveForm.patchValue({
      leaveid: user.leaveid,
      teamName: user.teamName,
      fullname: user.fullname,
      applyDate: user.applyDate,
      leaveStatus: user.leaveStatus,
      leaveType: user.leaveType,
      title: user.title,
      content: user.content,
      startDate: user.startDate,
      endingDate: user.endingDate,
      approvedBy: user.approvedBy,
      approvedDate: user.approvedDate,
      lop: user.lop,
      withoutLop: user.withoutLop,
      officialLeave: user.officialLeave,
      description: user.description,
      leavebalance: user.leaveBalance
    });

  }

  ngOnInit(): void {
    
  }

  close(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
