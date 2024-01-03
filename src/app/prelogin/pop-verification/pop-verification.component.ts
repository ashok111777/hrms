import { Component, ElementRef, HostListener, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { AlertService } from 'src/app/services/alerts.service';
import { LoaderService } from 'src/app/services/loader.service';
import { RestService } from 'src/app/services/rest.service';


@Component({
  selector: 'app-pop-verification',
  templateUrl: './pop-verification.component.html',
  styleUrls: ['./pop-verification.component.scss']
})

export class PopVerificationComponent implements OnInit {
  enableSecondStep = false;
  otpVerified = false;
  resendDisabled: boolean = true;
  timer: number = 60;
  showPassword: boolean = false;
  isEditable: boolean = true;
  @ViewChildren('otpInput') otpInputs: QueryList<ElementRef>;
  oTP: any;
  jsondata: any;


  constructor(public dialogRef: MatDialogRef<PopVerificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,

    public loderservice: LoaderService,
    private alert: AlertService,
    public rest: RestService,
  ) {
    console.log(data);

  }
  ngOnInit(): void {
    this.startTimer();
    this.otpInputs.changes.subscribe(inputs => {
      if (inputs.length > 0) {
        inputs.first.nativeElement.focus();
      }
    });

  }


  verficationForm = new FormGroup({
    password1: new FormControl('', [Validators.required,
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')]),
    password2: new FormControl('', [Validators.required,
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')]),
    otpRef: new FormControl('', Validators.required)

  });

  otpForm = new FormGroup({
    digit0: new FormControl('', [Validators.required]),
    digit1: new FormControl('', [Validators.required]),
    digit2: new FormControl('', [Validators.required]),
    digit3: new FormControl('', [Validators.required]),
    digit4: new FormControl('', [Validators.required]),
    digit5: new FormControl('', [Validators.required]),
    otpRef: new FormControl('', Validators.required)
  });

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      this.focusPreviousInput(event.target as HTMLInputElement);
      event.preventDefault(); // Prevent the default backspace behavior
    }
  }
  private focusPreviousInput(input: HTMLInputElement) {
    const index = +input.id.replace('digit', '');
    input.value = ''; // Clear the value of the current input
    if (index > 0) {
      const previousInputId = 'digit' + (index - 1);
      const previousInput = document.getElementById(previousInputId) as HTMLInputElement;
      if (previousInput) {
        previousInput.focus();
        previousInput.value = ''; // Clear the value of the previous input
      }
    }
  }



  onOtpInputChange(event: any, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.length > 1) {
      input.value = value.charAt(value.length - 1);
    }

    if (value.length === 0) {
      const previousInputId = 'digit' + (index - 1);
      const previousInput = document.getElementById(previousInputId) as HTMLInputElement;
      if (previousInput) {
        previousInput.focus();
      }
    } else {
      const nextInputId = 'digit' + (index + 1);
      const nextInput = document.getElementById(nextInputId) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  addValidator() {
    this.verficationForm.controls.otpRef.addValidators([Validators.required]);
    this.verficationForm.controls.otpRef.setErrors(Validators.required);
    this.verficationForm.controls.otpRef.setValidators(Validators.required);
  }

  removeValidator(stepper: MatStepper) {
    this.verficationForm.controls.otpRef.clearValidators();
    this.verficationForm.controls.otpRef.setErrors(null);
    this.verficationForm.controls.otpRef.setValidators(null);
    console.log('After remove validators');
    setTimeout(() => {
      this.submit(stepper);
    }, 200);
  }

  submit(stepper: MatStepper) {
    if (this.verficationForm.value && this.verficationForm.valid) {
      const password = this.verficationForm.value.password1
      const password2 = this.verficationForm.value.password2

      let newpassdetails: any = {
        'empId': this.data.empId,
        'otpRefId': this.data.otpRefId,
        'otp': this.oTP,
        'password': password,
        'confPassword': password2

      }
      console.log(newpassdetails);
      this.rest.postLoginData('auth/web/v1/verify/otp', newpassdetails).subscribe((resp: any) => {
        if (resp) {
          if (resp.respCode === 'HMS_00') {
            setTimeout(() => {
              stepper.next();
              this.isEditable = false;
            }, 1000);
          }
          else {
            this.alert.displayAlert(resp.respStatus, resp.message);
            this.loderservice.isLoading.next(false);
            this.addValidator();
          }
        }
      }, (err: any) => {
        
        console.log('Error Resp: ' + JSON.stringify(err));
        // this.alert.showAlert(err.status, err.error);
        this.addOtpRefValidator();
      });
    } else {

      // Handle invalid OTP input here if needed
    }
  }




  removeOtpRefValidator(stepper: MatStepper) {
    this.otpForm.controls.otpRef.clearValidators();
    this.otpForm.controls.otpRef.setErrors(null);
    this.otpForm.controls.otpRef.setValidators(null);
    console.log('After remove validators');
    setTimeout(() => {
      this.verifyOTP(stepper);
    }, 200);
  }
  verifyOTP(stepper: MatStepper) {
    console.log('OTP Form: ' + this.otpForm.valid);
    if (this.otpForm.value && this.otpForm.valid) { // Check if form is initialized and valid
      const otpCode = Object.values(this.otpForm.value).join('');
      console.log('Entered OTP:', otpCode);
      this.oTP = otpCode
      // const hashedOTP = sha512(otpCode); // Hash the OTP code using sha512 function
      let jsondetails: any = {
        'empId': this.data.empId,
        'otpRefId': this.data.otpRefId,
        'otp': otpCode
      };
      this.rest.postLoginData('auth/web/v1/verify/otp1', jsondetails).subscribe((resp: any) => {
        if (resp) {
          if (resp.respCode === 'HMS_00') {
            setTimeout(() => {
              stepper.next();
              this.isEditable = false;
            }, 1000);
          } else {
            this.alert.displayAlert(resp.respStatus, resp.message);
            this.loderservice.isLoading.next(false);
            this.addOtpRefValidator();
          }
        }
      }, (err: any) => {
        
        console.log('Error Resp: ' + JSON.stringify(err));
        this.addOtpRefValidator();
      });
    } else {
      // Handle invalid OTP input here if needed
    }
  }
  addOtpRefValidator() {
    this.otpForm.controls.otpRef.addValidators([Validators.required]);
    this.otpForm.controls.otpRef.setErrors(Validators.required);
    this.otpForm.controls.otpRef.setValidators(Validators.required);
  }

  resendOTP() {
    // Reset the timer and disable the resend button
    this.timer = 10;
    this.resendDisabled = true;

    // Start the timer again
    this.startTimer();
  }

  startTimer() {
    const interval = setInterval(() => {
      this.timer--;

      if (this.timer === 0) {
        // Timer reached zero, enable the resend button
        this.resendDisabled = false;
        clearInterval(interval);
      }
    }, 1000);
  }


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  close(data: any) {
    this.dialogRef.close({ data: data });


  }


  backtomainpage(data: any) {
    this.dialogRef.close({ data: data });
    this.router.navigate(['/prelogin']);
  }

 
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    classList: {
      inputBox: 'my-super-box-class',
      input: 'my-super-class',
      inputFilled: 'my-super-filled-class',
      inputDisabled: 'my-super-disable-class',
      inputSuccess: 'my-super-success-class',
      inputError: 'my-super-error-class'
    }
  };

  handeOtpChange(value: string[]): void {
    console.log(value);
  }

  handleFillEvent(value: string): void {
    console.log(value);
  }

}

