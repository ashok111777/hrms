import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { LoaderService } from 'src/app/services/loader.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-wfm-satus-details',
  templateUrl: './wfm-satus-details.component.html',
  styleUrls: ['./wfm-satus-details.component.scss']
})
export class WfmSatusDetailsComponent implements OnInit {
  wfmfrom: FormGroup;

  constructor(
    public global: GlobalService,
    public loaderService: LoaderService,
    public dialogRef: MatDialogRef<WfmSatusDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public restApi: RestService,
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.wfmfrom = this.fb.group({
      id: [''],
      fromDate: [''],
      toDate: [''],
      applyDate: [''],
      reason: [''],
      description: [''],
      authByName: [''],
      authDate: [''],
      requestType: [''],
      status: [''],
      comments: [''],
      empName: [''],
      empId: [''],
      empTeam: [''],
    });

    // If data.mode is not 'A', patch the values
    if (this.data.mode !== 'A') {
      this.wfmfrom.patchValue(this.data);
    }


  }

  
}