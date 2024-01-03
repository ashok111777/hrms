import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-add-edit-festival',
  templateUrl: './add-edit-festival.component.html',
  styleUrls: ['./add-edit-festival.component.scss']
})
export class AddEditFestivalComponent {
  festivalForm: FormGroup;
  fileValid = false;
  csv: any;
  firstFormInteracted = false;
  formEnabled = true; // Initially, the form controls are enabled
  showTooltip: boolean;

  constructor(private fb: FormBuilder, public global: GlobalService, public dialogRef: MatDialogRef<AddEditFestivalComponent>,
    @Inject(MAT_DIALOG_DATA) public user: any, private restApi: RestService, private datePipe: DatePipe, private ngZone: NgZone, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.InitForm();
  }

  InitForm() {
    this.festivalForm = this.fb.group({
      festivalName: ['', Validators.required],
      date: [Date, Validators.required],
      description: ['', Validators.required],
      state: "TamilNadu",
    });
  }

  sendSaveRequest() {
    const data: any = this.festivalForm.getRawValue();
    data.date = this.datePipe.transform(data.date, 'dd-MM-yyyy');
    data.year = this.datePipe.transform(this.festivalForm.controls['date'].value, 'yyyy');
    console.log(data);

    if (this.fileValid) {
      this.sendSaveRequestWithCsvFile(this.csv)
    } else if (data) {
      this.restApi.postDatanewuser('api/web/v1/festival/add', data).subscribe((resp: any) => {
        if (resp.respCode === 'HMS_00') {
          const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data);
          this.close();
        }
        if (resp.respCode !== 'HMS_00') {
          this.global.showAlert(resp.respStatus, resp.message);
        }
      });
    }
  }

  toggleFormEnablement(disable: boolean) {
    console.log(disable);

    if (disable == false) {
      this.festivalForm!.get('festivalName')!.disable();
      this.festivalForm!.get('date')!.disable();
      this.festivalForm!.get('description')!.disable();
      // Disable other form controls as needed

    } else {
      this.festivalForm!.get('festivalName')!.enable();
      this.festivalForm!.get('date')!.enable();
      this.festivalForm!.get('description')!.enable();
      // Enable other form controls as needed
    }
  }


  handleFileInput(event: any) {
    this.festivalForm.reset();
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      if (fileName.endsWith('.xlsx')) {
        this.ngZone.run(() => {
          this.fileValid = true;
          this.toggleFormEnablement(false); // Disable the form controls
        });
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) { // Check if e.target is not null
            const result: ArrayBuffer | null = e.target.result as ArrayBuffer;
            if (result) {
              const data = new Uint8Array(result);
              const workbook = XLSX.read(data, { type: 'array' });
              const sheetName = workbook.SheetNames[0]; // Assuming there's only one sheet
              const worksheet = workbook.Sheets[sheetName];
              const csvData = XLSX.utils.sheet_to_csv(worksheet);
              this.csv = csvData;
            }
          }
        };
        reader.readAsArrayBuffer(file);
      } else {
        this.ngZone.run(() => {
          this.fileValid = false;
          this.toggleFormEnablement(true); // Enable the form controls
        });
        // Show an alert to the user that the file format is not valid
        this.global.showAlert('Invalid File Format', 'Please upload an XLSX file.');
      }
      this.cdr.detectChanges(); // Trigger change detection
    }
  }

  sendSaveRequestWithCsvFile(csvData: string) {
    // Create FormData object
    const formData = new FormData();

    // Convert CSV data to Blob
    const csvBlob = new Blob([csvData], { type: 'text/csv' });

    // Append CSV Blob to FormData
    formData.append('file', csvBlob, `festivalData_${new Date().toISOString()}.csv`);

    // Send POST request with FormData
    this.restApi.postDataemp('api/web/v1/upload', formData).subscribe((resp: any) => {
      if (resp.respCode === 'HMS_00') {
        const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data);
        this.close();
      }
      if (resp.respCode !== 'HMS_00') {
        this.global.showAlert(resp.respStatus, resp.message);
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
