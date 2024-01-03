import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './aboutus/contact/contact.component';
import { AttendenceStatusComponent } from './attendence-status/attendence-status.component';
import { ComplaintsComponent } from './complaints/complaints/complaints.component';
import { SuggestionsComponent } from './complaints/suggestions/suggestions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeRegistrationComponent } from './employee/employee-registration/employee-registration.component';
import { MedclaimReqComponent } from './employee/medclaim-req/medclaim-req.component';
import { ProbationMgmtComponent } from './employee/probation-mgmt/probation-mgmt.component';
import { TrainingScheduleComponent } from './employee/training-schedule/training-schedule.component';
import { BirthdayWishesComponent } from './events/birthday-wishes/birthday-wishes.component';
import { CustomWishesComponent } from './events/custom-wishes/custom-wishes.component';
import { FunFridayComponent } from './events/fun-friday/fun-friday.component';
import { HolidayComponent } from './events/holiday/holiday.component';
import { KudosWishesComponent } from './events/kudos-wishes/kudos-wishes.component';
import { LeaveCalenderComponent } from './events/leave-calender/leave-calender.component';
import { NewJoiningComponent } from './events/new-joining/new-joining.component';
import { NewsComponent } from './events/news/news.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { HourReqComponent } from './leave/hour-req/hour-req.component';
import { LatecomeReqComponent } from './leave/latecome-req/latecome-req.component';
import { LeaveReqComponent } from './leave/leave-req/leave-req.component';
import { DepartmentMgmtComponent } from './manage/department-mgmt/department-mgmt.component';
import { DesigMgmtComponent } from './manage/desig-mgmt/desig-mgmt.component';
import { InstituteMgmtComponent } from './manage/institute-mgmt/institute-mgmt.component';
import { ProfileMgmtComponent } from './manage/profile-mgmt/profile-mgmt.component';
import { UserMgmtComponent } from './manage/user-mgmt/user-mgmt.component';
import { AttendanceReportsComponent } from './reports/attendance-reports/attendance-reports.component';
import { EmployeeReportComponent } from './reports/employee-report/employee-report.component';
import { LatecomeReportComponent } from './reports/latecome-report/latecome-report.component';
import { NewJoiningReportComponent } from './reports/new-joining-report/new-joining-report.component';
import { OnsiteEmployeeReportComponent } from './reports/onsite-employee-report/onsite-employee-report.component';
import { WfhReportComponent } from './reports/wfh-report/wfh-report.component';
import { SalesComponent } from './sales/sales.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'sales',
        component: SalesComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'attendence-status',
        component: AttendenceStatusComponent
      },
      {
        path: 'employee-registration',
        component: EmployeeRegistrationComponent
      },
      {
        path: 'employee-list',
        component: EmployeeListComponent
      },
      {
        path: 'training-schedule',
        component: TrainingScheduleComponent
      },
      {
        path: 'desig-mgmt',
        component: DesigMgmtComponent
      },
      {
        path: 'department-mgmt',
        component: DepartmentMgmtComponent
      },
      {
        path: 'institute-mgmt',
        component: InstituteMgmtComponent
      },
      {
        path: 'user-mgmt',
        component: UserMgmtComponent
      },
      {
        path: 'profile-mgmt',
        component: ProfileMgmtComponent
      },
      {
        path: 'mediclaim-request',
        component: MedclaimReqComponent
      },
      {
        path: 'probation-management',
        component: ProbationMgmtComponent
      },
      {
        path: 'leave-request',
        component: LeaveReqComponent
      },
      {
        path: 'late-come-request',
        component: LatecomeReqComponent
      },
      {
        path: 'hour-request',
        component: HourReqComponent
      },
      {
        path: 'new-joining-wish',
        component: NewJoiningComponent
      },
      {
        path: 'birthday-wishes',
        component: BirthdayWishesComponent
      },
      {
        path: 'kudos-wishes',
        component: KudosWishesComponent
      },
      {
        path: 'holiday',
        component: HolidayComponent
      },
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: 'leave-calendar',
        component: LeaveCalenderComponent
      },
      {
        path: 'custom-wishes',
        component: CustomWishesComponent
      },
      {
        path: 'fun-friday',
        component: FunFridayComponent
      },
      {
        path: 'complaints',
        component: ComplaintsComponent
      },
      {
        path: 'suggestions',
        component: SuggestionsComponent
      },
      {
        path: 'employee-report',
        component: EmployeeReportComponent
      },
      {
        path: 'attendance-report',
        component: AttendanceReportsComponent
      },
      {
        path: 'latecome-report',
        component: LatecomeReportComponent
      },
      {
        path: 'wfh-report',
        component: WfhReportComponent
      },
      {
        path: 'newjoining-report',
        component: NewJoiningReportComponent
      },
      {
        path: 'onsite-employee-report',
        component: OnsiteEmployeeReportComponent
      },
      {
        path: 'app-aboutus',
        component: AboutusComponent
      },
      {
        path: 'app-contact',
        component: ContactComponent

      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
