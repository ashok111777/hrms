import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from 'src/app/services/alerts.service';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-refer',
  templateUrl: './refer.component.html',
  styleUrls: ['./refer.component.scss']
})

export class ReferComponent {
  constructor(private _snackBar: MatSnackBar,
    private restApi: RestService,
    public dialogRef: MatDialogRef<ReferComponent>,
    public global: GlobalService,
    public alert: AlertService,
    private cdRef: ChangeDetectorRef) { }

  disable: boolean = false;
  DetailForm = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')]),
  })

  Senddata() {
    if (this.DetailForm.value.emailId) {
      this.disable = true;
      this.restApi.postDatanewuser('api/web/v1/send/onboarding/mail?emailId=' + this.DetailForm.value.emailId, null).subscribe(
        (resp: any) => {
          if (resp) {
            this.disable = false;
            if (resp.respCode === 'HMS_00') {
              this.disable = false;
              const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data);
              this.dialogRef.close(); // Close the dialog
              this.cdRef.detectChanges(); // Trigger change detection if needed
            }
            if (resp.respCode !== 'HMS_00') {
              this.alert.displayAlert(resp.respStatus, resp.message);
              this.disable = false;
            }
          }
        }
      );
    }
  }

  close() {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 1000 });
  }
}