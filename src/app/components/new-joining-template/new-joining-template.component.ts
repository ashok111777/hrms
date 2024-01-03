import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-new-joining-template',
  templateUrl: './new-joining-template.component.html',
  styleUrls: ['./new-joining-template.component.scss']
})
export class NewJoiningTemplateComponent {
  form: FormGroup;
  emailList: string[] = [];
  userid: any;
  userDetails: any;

  constructor(
    private fb: FormBuilder,
    private restApi: RestService,
    public global: GlobalService,
    private sharedService: SharedService
  ) {

  }
  ngOnInit(): void {
    this.form = this.fb.group({
      // from: ['', [Validators.required, Validators.email]],
      toEmail: ['', [Validators.required, Validators.email]],
      cc: ['', Validators.email],
      subject:['',Validators.required],
      data: ['', Validators.required],
    });

    this.sharedService.getSharedData().subscribe(data => {
      this.userid = data?.userId;
    });

    this.getprofileDetails();
  }

  getprofileDetails() {
    this.restApi.getService('auth/web/v1/get/userId/' + sessionStorage.getItem('dummyUserId') || this.userid).subscribe(
      (resp: any) => {
        this.userDetails = resp.data;

      }, (err: any) => {
        
      })
  }
  onSubmit() {
    if (this.form.valid) {
      // Form is valid, perform submission logic
      this.restApi.postDatanewuser('auth/web/v1/send/celebrationMail', this.form.getRawValue()).subscribe(
        (resp: any) => {
          if (resp.respCode === 'HMS_00') {
            const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data);
          }
        }, (err: any) => {
          
          if (err.respCode === 'HMS_01') {
            this.global.showAlert(err.message, err.data);
          }
        }
      );
    } else {
      // Form is invalid, mark controls as touched to display error messages
      this.form.markAllAsTouched();
    }
  }

 
  config1: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '20rem',
    height: 'auto',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: false,
    // toolbarPosition: 'top',
    outline: true,
    defaultFontName: 'Comic Sans MS',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    defaultFontSize: '5',
    // showToolbar: false,
    defaultParagraphSeparator: 'p',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    // toolbarHiddenButtons: [
    //   ['bold', 'italic'],
    //   ['fontSize']
    // ],

  };

  onChange() {
    console.log('changed');
  }

  onBlur(event: string) {
    console.log('blur ' + event);
  }

  onChange2(event: any) {
    console.warn(this.form.value);
  }

}



