import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloginRoutingModule } from './prelogin-routing.module';
import { LoginComponent } from './login/login.component';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SetnewpasswordComponent } from './setnewpassword/setnewpassword.component';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { PopVerificationComponent } from './pop-verification/pop-verification.component';
@NgModule({
  declarations: [
    LoginComponent,
    SetnewpasswordComponent,
    PopVerificationComponent
  ],
  imports: [
    CommonModule,
    PreloginRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxOtpInputModule
  ]
})
export class PreloginModule { }
