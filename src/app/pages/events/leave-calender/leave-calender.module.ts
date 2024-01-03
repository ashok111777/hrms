import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveCalenderRoutingModule } from './leave-calender-routing.module';
import { LeaveCalenderComponent } from './leave-calender.component';
import { AddEditFestivalComponent } from './add-edit-festival/add-edit-festival.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first

@NgModule({
  declarations: [
    LeaveCalenderComponent,
    AddEditFestivalComponent
  ],
  imports: [
    CommonModule,
    LeaveCalenderRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    FullCalendarModule
  ]
})

export class LeaveCalenderModule { }
