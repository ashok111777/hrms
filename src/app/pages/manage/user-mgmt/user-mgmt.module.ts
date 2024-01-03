import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMgmtRoutingModule } from './user-mgmt-routing.module';
import { UserMgmtComponent } from './user-mgmt.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [UserMgmtComponent],
  imports: [
    CommonModule,
    UserMgmtRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule
  ]
})
export class UserMgmtModule { }
