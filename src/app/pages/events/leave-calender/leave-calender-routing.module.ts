import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveCalenderComponent } from './leave-calender.component';
import { AddEditFestivalComponent } from './add-edit-festival/add-edit-festival.component';

const routes: Routes = [
  {
    path:'',
    component:LeaveCalenderComponent,
    children:[
      {
        path:'',
        redirectTo:'leave',
        pathMatch:'full'
      },
      {
        path:'leave',
        component:AddEditFestivalComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveCalenderRoutingModule { }
