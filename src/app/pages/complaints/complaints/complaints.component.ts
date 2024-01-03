import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent  implements OnInit {
  showSuccessMessage: boolean = false;

  onSubmit() {
    
    this.showSuccessMessage = true;
  }
  institutes:string[]=['CGS'];
  profiles=['HR', 'ADMIN', 'MANAGER', 'M PAY', 'EZLINK' , 'START CARDMAN', 'R&N'];
  userForm = new FormGroup({
    id: new FormControl('', [Validators.required,]),
    inst: new FormControl('', [Validators.required,]),
    profile: new FormControl('', [Validators.required, Validators.minLength(1)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(1)]),
    mobile: new FormControl('', [Validators.required, Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.minLength(8)]),
    
  });
  

 
  ngOnInit(): void {
   
  }
  

}

