import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { SalesComponent } from './sales/sales.component';
import { LayoutComponent } from './layout/layout.component';
import { MenuItemComponent } from './layout/menu-item/menu-item.component';
import { AngularMaterialModule } from '../angular-material.module';
import { PageHeaderComponent } from './layout/page-header.component';
import { HeaderComponent } from './layout/header.component';
import { AttendenceStatusComponent } from './attendence-status/attendence-status.component';
import { TopHeaderComponent } from './layout/top-header/top-header.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { AlertComponent } from '../components/alert/alert.component';
import { MessagesComponent } from '../components/messages/messages.component';
import { EmployeeRegistrationComponent } from './employee/employee-registration/employee-registration.component';
import { TrainingScheduleComponent } from './employee/training-schedule/training-schedule.component';
import { MatChipsModule } from '@angular/material/chips';
import { DesigMgmtComponent } from './manage/desig-mgmt/desig-mgmt.component';
import { DepartmentMgmtComponent } from './manage/department-mgmt/department-mgmt.component';
import { InstituteMgmtComponent } from './manage/institute-mgmt/institute-mgmt.component';
import { UserMgmtComponent } from './manage/user-mgmt/user-mgmt.component';
import { ProfileMgmtComponent } from './manage/profile-mgmt/profile-mgmt.component';
import { RestService } from '../services/rest.service';
import { DepartmentDetailsComponent } from '../components/department-details/department-details.component';
import { DesignationDetailComponent } from '../components/designation-detail/designation-detail.component';
import { InstituteDetailComponent } from '../components/institute-detail/institute-detail.component';
import { ProfileDetailComponent } from '../components/profile-detail/profile-detail.component';
import { UserDetailComponent } from '../components/user-detail/user-detail.component';
import { MedclaimReqComponent } from './employee/medclaim-req/medclaim-req.component';
import { ProbationMgmtComponent } from './employee/probation-mgmt/probation-mgmt.component';
import { LeaveReqComponent } from './leave/leave-req/leave-req.component';
import { LatecomeReqComponent } from './leave/latecome-req/latecome-req.component';
import { HourReqComponent } from './leave/hour-req/hour-req.component';
import { NewJoiningComponent } from './events/new-joining/new-joining.component';
import { BirthdayWishesComponent } from './events/birthday-wishes/birthday-wishes.component';
import { KudosWishesComponent } from './events/kudos-wishes/kudos-wishes.component';
import { HolidayComponent } from './events/holiday/holiday.component';
import { NewsComponent } from './events/news/news.component';
import { LeaveCalenderComponent } from './events/leave-calender/leave-calender.component';
import { CustomWishesComponent } from './events/custom-wishes/custom-wishes.component';
import { FunFridayComponent } from './events/fun-friday/fun-friday.component';
import { ComplaintsComponent } from './complaints/complaints/complaints.component';
import { SuggestionsComponent } from './complaints/suggestions/suggestions.component';
import { AttendanceReportsComponent } from './reports/attendance-reports/attendance-reports.component';
import { EmployeeReportComponent } from './reports/employee-report/employee-report.component';
import { LatecomeReportComponent } from './reports/latecome-report/latecome-report.component';
import { WfhReportComponent } from './reports/wfh-report/wfh-report.component';
import { NewJoiningReportComponent } from './reports/new-joining-report/new-joining-report.component';
import { OnsiteEmployeeReportComponent } from './reports/onsite-employee-report/onsite-employee-report.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeDetailComponent } from '../components/employee-detail/employee-detail.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './aboutus/contact/contact.component';
import { EmpListComponent } from './leave/emp-list/emp-list.component';
import { BirthListComponent } from './events/birthday-wishes/birth-list/birth-list.component';
import { LeavedetailListComponent } from './leave/leavedetail-list/leavedetail-list.component';
import { DatePickerDialogComponent } from './leave/date-picker-dialog/date-picker-dialog.component';
import { TrainingDetailsComponent } from './employee/training-schedule/training-details/training-details.component';
import { WishTemplatesComponent } from '../components/wish-templates/wish-templates.component';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FullcalenderComponent } from './events/fullcalender/fullcalender.component';
import { AuditReportComponent } from './reports/audit-report/audit-report.component';
import { ProductMgmtComponent } from './manage/product-mgmt/product-mgmt.component';
import { ProbationReportComponent } from './reports/probation-report/probation-report.component';
import { EmployeeexitReportComponent } from './reports/employeeexit-report/employeeexit-report.component';
import { WfmStatusComponent } from './leave/wfm-status/wfm-status.component';





@NgModule({
  declarations: [
    // DashboardComponent,
    // HomeComponent,
    // SalesComponent,
    // LayoutComponent,
    // MenuItemComponent,
    // HeaderComponent,
    // PageHeaderComponent,
    // AttendenceStatusComponent,
    // TopHeaderComponent,
    // NotificationsComponent,
    // AlertComponent,
    // MessagesComponent,
    // EmployeeRegistrationComponent,
    // TrainingScheduleComponent,
    // DesigMgmtComponent,
    // DepartmentMgmtComponent,
    // InstituteMgmtComponent,
    // UserMgmtComponent,
    // ProfileMgmtComponent,
    // DepartmentDetailsComponent,
    // DesignationDetailComponent,
    // InstituteDetailComponent,
    // ProfileDetailComponent,
    // UserDetailComponent,
    // MedclaimReqComponent,
    // ProbationMgmtComponent,
    // LeaveReqComponent,
    // LatecomeReqComponent,
    // HourReqComponent,
    // NewJoiningComponent,
    // BirthdayWishesComponent,
    // KudosWishesComponent,
    // HolidayComponent,
    // NewsComponent,
    // LeaveCalenderComponent,
    // CustomWishesComponent,
    // FunFridayComponent,
    // ComplaintsComponent,
    // SuggestionsComponent,
    // AttendanceReportsComponent,
    // EmployeeReportComponent,
    // LatecomeReportComponent,
    // WfhReportComponent,
    // NewJoiningReportComponent,
    // OnsiteEmployeeReportComponent,
    // UserProfileComponent,
    // EmployeeListComponent,
    // EmployeeDetailComponent,
    // AboutusComponent,
    // ContactComponent,
    // EmpListComponent,
    // BirthListComponent,
    // LeavedetailListComponent,
    // DatePickerDialogComponent,
    // TrainingDetailsComponent,
    // WishTemplatesComponent,
    // EmpPicComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    // AngularMaterialModule,
    // MatChipsModule,
  ],
  providers: [
    DatePipe
  ]
})
export class PagesModule { 
  
}
