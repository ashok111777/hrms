import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { HTTP_INTERCEPTORS, HttpClientModule, } from '@angular/common/http';
import { environment } from "../environments/environment";
import { LoadingComponent } from './components/loading/loading.component';
import { CurrencyMaskConfig, CurrencyMaskModule } from 'ng2-currency-mask';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { NotfoundComponent } from './others/notfound/notfound.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { initializeApp } from "firebase/app";
import { LoaderInterceptor } from './interceptors/loader-interceptor.service';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { NgChartsModule } from 'ng2-charts';
import { HighchartsChartModule } from 'highcharts-angular';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { TagInputModule } from 'ngx-chips';


initializeApp(environment.firebase);

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  decimal: ".",
  precision: 2,
  prefix: "",
  suffix: "",
  thousands: ","
};

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    NotfoundComponent,
  ],
  imports: [
    HighchartsChartModule,
    TagInputModule,
    NgChartsModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CurrencyMaskModule,
    NgIdleKeepaliveModule.forRoot(),
    NgxOtpInputModule,
    NgxMaterialTimepickerModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    
    
  ],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }


