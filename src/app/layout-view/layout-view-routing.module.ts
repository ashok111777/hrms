import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutViewComponent } from './layout-view.component';
import { AboutusComponent } from '../pages/aboutus/aboutus.component';
import { ContactComponent } from '../pages/aboutus/contact/contact.component';
import { AttendenceStatusComponent } from '../pages/attendence-status/attendence-status.component';
import { ComplaintsComponent } from '../pages/complaints/complaints/complaints.component';
import { SuggestionsComponent } from '../pages/complaints/suggestions/suggestions.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { EmployeeListComponent } from '../pages/employee/employee-list/employee-list.component';
import { EmployeeRegistrationComponent } from '../pages/employee/employee-registration/employee-registration.component';
import { MedclaimReqComponent } from '../pages/employee/medclaim-req/medclaim-req.component';
import { ProbationMgmtComponent } from '../pages/employee/probation-mgmt/probation-mgmt.component';
import { TrainingScheduleComponent } from '../pages/employee/training-schedule/training-schedule.component';
import { BirthdayWishesComponent } from '../pages/events/birthday-wishes/birthday-wishes.component';
import { CustomWishesComponent } from '../pages/events/custom-wishes/custom-wishes.component';
import { FunFridayComponent } from '../pages/events/fun-friday/fun-friday.component';
import { HolidayComponent } from '../pages/events/holiday/holiday.component';
import { KudosWishesComponent } from '../pages/events/kudos-wishes/kudos-wishes.component';
import { NewJoiningComponent } from '../pages/events/new-joining/new-joining.component';
import { NewsComponent } from '../pages/events/news/news.component';
import { HomeComponent } from '../pages/home/home.component';
import { HourReqComponent } from '../pages/leave/hour-req/hour-req.component';
import { LatecomeReqComponent } from '../pages/leave/latecome-req/latecome-req.component';
import { LeaveReqComponent } from '../pages/leave/leave-req/leave-req.component';
import { DepartmentMgmtComponent } from '../pages/manage/department-mgmt/department-mgmt.component';
import { DesigMgmtComponent } from '../pages/manage/desig-mgmt/desig-mgmt.component';
import { InstituteMgmtComponent } from '../pages/manage/institute-mgmt/institute-mgmt.component';
import { ProfileMgmtComponent } from '../pages/manage/profile-mgmt/profile-mgmt.component';

import { AttendanceReportsComponent } from '../pages/reports/attendance-reports/attendance-reports.component';
import { EmployeeReportComponent } from '../pages/reports/employee-report/employee-report.component';
import { LatecomeReportComponent } from '../pages/reports/latecome-report/latecome-report.component';
import { NewJoiningReportComponent } from '../pages/reports/new-joining-report/new-joining-report.component';
import { OnsiteEmployeeReportComponent } from '../pages/reports/onsite-employee-report/onsite-employee-report.component';
import { WfhReportComponent } from '../pages/reports/wfh-report/wfh-report.component';
import { SalesComponent } from '../pages/sales/sales.component';
import { HolidaysComponent } from '../pages/holidays/holidays.component';
import { AuditReportComponent } from '../pages/reports/audit-report/audit-report.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { BirthListComponent } from '../pages/events/birthday-wishes/birth-list/birth-list.component';
import { NotificationListComponent } from '../components/notification-list/notification-list.component';
import { PolicyConfigComponent } from '../pages/policy-config/policy-config.component';
import { ProductMgmtComponent } from '../pages/manage/product-mgmt/product-mgmt.component';
import { ProbationReportComponent } from '../pages/reports/probation-report/probation-report.component';
import { EmployeeexitReportComponent } from '../pages/reports/employeeexit-report/employeeexit-report.component';
import { NewJoiningTemplateComponent } from '../components/new-joining-template/new-joining-template.component';
import { WishTemplatesComponent } from '../components/wish-templates/wish-templates.component';
import { WfmStatusComponent } from '../pages/leave/wfm-status/wfm-status.component';
import { OnsiteDetailComponent } from '../components/onsite-detail/onsite-detail.component';


const routes: Routes = [
  {
    path: '', component: LayoutViewComponent,
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
        loadChildren: () => import('../pages/manage/user-mgmt/user-mgmt.module').then((m) => m.UserMgmtModule)
      },
      {
        path: 'leave-calendar',
        loadChildren: () => import('../pages/events/leave-calender/leave-calender.module').then((m) => m.LeaveCalenderModule)
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
      {
        path: 'app-holidays',
        component: HolidaysComponent
      },
      {
        path: 'app-audit-report',
        component: AuditReportComponent,
      },
      {
        path: 'app-user-profile',
        component: UserProfileComponent
      },
      {
        path: 'app-birth-list',
        component: BirthListComponent
      },
      {
        path: 'app-notification-list',
        component: NotificationListComponent
      }, {
        path: 'policy-config',
        component: PolicyConfigComponent
      }, {
        path: 'product-management',
        component: ProductMgmtComponent
      },
      {
        path: 'probation-report',
        component: ProbationReportComponent
      }, {
        path: 'employeeexit-report',
        component: EmployeeexitReportComponent
      },
      {
        path: 'new-joining-template',
        component: NewJoiningTemplateComponent
      }, {
        path: 'kudoswish-templates',
        component: WishTemplatesComponent
      }, {
        path: 'workfromhome-status',
        component: WfmStatusComponent
      },
      {
        path: 'onsite-detail',
        component: OnsiteDetailComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutViewRoutingModule { }
