import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LayoutViewRoutingModule } from './layout-view-routing.module';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { LayoutViewComponent } from './layout-view.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { AngularMaterialModule } from '../angular-material.module';
import { AlertComponent } from '../components/alert/alert.component';
import { DepartmentDetailsComponent } from '../components/department-details/department-details.component';
import { DesignationDetailComponent } from '../components/designation-detail/designation-detail.component';
import { EmployeeDetailComponent } from '../components/employee-detail/employee-detail.component';
import { InstituteDetailComponent } from '../components/institute-detail/institute-detail.component';
import { MessagesComponent } from '../components/messages/messages.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { ProfileDetailComponent } from '../components/profile-detail/profile-detail.component';
import { UserDetailComponent } from '../components/user-detail/user-detail.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { WishTemplatesComponent } from '../components/wish-templates/wish-templates.component';
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
import { TrainingDetailsComponent } from '../pages/employee/training-schedule/training-details/training-details.component';
import { TrainingScheduleComponent } from '../pages/employee/training-schedule/training-schedule.component';
import { BirthListComponent } from '../pages/events/birthday-wishes/birth-list/birth-list.component';
import { BirthdayWishesComponent } from '../pages/events/birthday-wishes/birthday-wishes.component';
import { CustomWishesComponent } from '../pages/events/custom-wishes/custom-wishes.component';
import { FunFridayComponent } from '../pages/events/fun-friday/fun-friday.component';
import { HolidayComponent } from '../pages/events/holiday/holiday.component';
import { KudosWishesComponent } from '../pages/events/kudos-wishes/kudos-wishes.component';
import { LeaveCalenderComponent } from '../pages/events/leave-calender/leave-calender.component';
import { NewJoiningComponent } from '../pages/events/new-joining/new-joining.component';
import { NewsComponent } from '../pages/events/news/news.component';
import { HomeComponent } from '../pages/home/home.component';
import { HeaderComponent } from '../pages/layout/header.component';
import { LayoutComponent } from '../pages/layout/layout.component';
import { MenuItemComponent } from '../pages/layout/menu-item/menu-item.component';
import { PageHeaderComponent } from '../pages/layout/page-header.component';
import { TopHeaderComponent } from '../pages/layout/top-header/top-header.component';
import { DatePickerDialogComponent } from '../pages/leave/date-picker-dialog/date-picker-dialog.component';
import { EmpListComponent } from '../pages/leave/emp-list/emp-list.component';
import { HourReqComponent } from '../pages/leave/hour-req/hour-req.component';
import { LatecomeReqComponent } from '../pages/leave/latecome-req/latecome-req.component';
import { LeaveReqComponent } from '../pages/leave/leave-req/leave-req.component';
import { LeavedetailListComponent } from '../pages/leave/leavedetail-list/leavedetail-list.component';
import { DepartmentMgmtComponent } from '../pages/manage/department-mgmt/department-mgmt.component';
import { DesigMgmtComponent } from '../pages/manage/desig-mgmt/desig-mgmt.component';
import { InstituteMgmtComponent } from '../pages/manage/institute-mgmt/institute-mgmt.component';
import { ProfileMgmtComponent } from '../pages/manage/profile-mgmt/profile-mgmt.component';
import { UserMgmtComponent } from '../pages/manage/user-mgmt/user-mgmt.component';
import { AttendanceReportsComponent } from '../pages/reports/attendance-reports/attendance-reports.component';
import { EmployeeReportComponent } from '../pages/reports/employee-report/employee-report.component';
import { LatecomeReportComponent } from '../pages/reports/latecome-report/latecome-report.component';
import { NewJoiningReportComponent } from '../pages/reports/new-joining-report/new-joining-report.component';
import { OnsiteEmployeeReportComponent } from '../pages/reports/onsite-employee-report/onsite-employee-report.component';
import { WfhReportComponent } from '../pages/reports/wfh-report/wfh-report.component';
import { SalesComponent } from '../pages/sales/sales.component';
import { ProbationDetailsComponent } from '../components/probation-details/probation-details.component';
import { BirthdayCardComponent } from '../components/birthday-card/birthday-card.component';
import { NewJoingCardComponent } from '../components/new-joing-card/new-joing-card.component';
import { ForgotPassComponent } from '../prelogin/forgot-pass/forgot-pass.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { ReferComponent } from '../components/refer/refer.component';
import { UserLocationsComponent } from '../components/user-locations/user-locations.component';
import { WFMlistComponent } from '../components/wfmlist/wfmlist.component';
import { NewJoiningTemplateComponent } from '../components/new-joining-template/new-joining-template.component';
import { HolidaysComponent } from '../pages/holidays/holidays.component';
import { AuditReportComponent } from '../pages/reports/audit-report/audit-report.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatTableResponsiveModule } from '../mat-table-responsive/mat-table-responsive.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NotificationListComponent } from '../components/notification-list/notification-list.component';
import { PolicyConfigComponent } from '../pages/policy-config/policy-config.component';
import { ProductMgmtComponent } from '../pages/manage/product-mgmt/product-mgmt.component';
import { ProductmgmtDetailsComponent } from '../components/productmgmt-details/productmgmt-details.component';
import { LoginWishesComponent } from '../components/login-wishes/login-wishes.component';
import { ProbationReportComponent } from '../pages/reports/probation-report/probation-report.component';
import { EmployeeexitReportComponent } from '../pages/reports/employeeexit-report/employeeexit-report.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TagInputModule } from 'ngx-chips';
import { UsersComponent } from '../pages/manage/user-mgmt/users/users.component';
import { RolesComponent } from '../pages/manage/user-mgmt/roles/roles.component';
import { WfmStatusComponent } from '../pages/leave/wfm-status/wfm-status.component';
import { WfmSatusDetailsComponent } from '../components/wfm-satus-details/wfm-satus-details.component';
import { OnsiteListComponent } from '../pages/onsite-list/onsite-list.component';
import { OnsiteDetailComponent } from '../components/onsite-detail/onsite-detail.component';
import { FilterPipe } from '../services/filter.pipe';


@NgModule({
  declarations: [
    AuditReportComponent,
    HolidaysComponent,
    NewJoiningTemplateComponent,
    WFMlistComponent,
    UserLocationsComponent,
    ReferComponent,
    ForgotPassComponent,
    NewJoingCardComponent,
    BirthdayCardComponent,
    ProbationDetailsComponent,
    LayoutViewComponent,
    SideMenuComponent,
    SideMenuComponent,
    DashboardComponent,
    HomeComponent,
    SalesComponent,
    LayoutComponent,
    MenuItemComponent,
    HeaderComponent,
    PageHeaderComponent,
    AttendenceStatusComponent,
    TopHeaderComponent,
    NotificationsComponent,
    AlertComponent,
    MessagesComponent,
    EmployeeRegistrationComponent,
    TrainingScheduleComponent,
    DesigMgmtComponent,
    DepartmentMgmtComponent,
    InstituteMgmtComponent,
    ProfileMgmtComponent,
    DepartmentDetailsComponent,
    DesignationDetailComponent,
    InstituteDetailComponent,
    ProfileDetailComponent,
    UserDetailComponent,
    MedclaimReqComponent,
    ProbationMgmtComponent,
    LeaveReqComponent,
    LatecomeReqComponent,
    HourReqComponent,
    NewJoiningComponent,
    BirthdayWishesComponent,
    KudosWishesComponent,
    HolidayComponent,
    NewsComponent,
    CustomWishesComponent,
    FunFridayComponent,
    ComplaintsComponent,
    SuggestionsComponent,
    AttendanceReportsComponent,
    EmployeeReportComponent,
    LatecomeReportComponent,
    WfhReportComponent,
    NewJoiningReportComponent,
    OnsiteEmployeeReportComponent,
    UserProfileComponent,
    EmployeeListComponent,
    EmployeeDetailComponent,
    AboutusComponent,
    ContactComponent,
    EmpListComponent,
    BirthListComponent,
    LeavedetailListComponent,
    DatePickerDialogComponent,
    TrainingDetailsComponent,
    WishTemplatesComponent,
    NotificationListComponent,
    PolicyConfigComponent,
    ProductMgmtComponent,
    ProductmgmtDetailsComponent,
    LoginWishesComponent,
    EmployeeexitReportComponent,
    ProbationReportComponent,
    UsersComponent,
    RolesComponent,
    WfmStatusComponent,
    WfmSatusDetailsComponent,
    TopMenuComponent,
    OnsiteListComponent,
    OnsiteDetailComponent,
    FilterPipe
  ],
  imports: [
    MatTableResponsiveModule,
    HighchartsChartModule,
    CommonModule,
    LayoutViewRoutingModule,
    AngularMaterialModule,
    AngularEditorModule,
    NgIdleKeepaliveModule.forRoot(),
    CKEditorModule,
    NgxMaterialTimepickerModule,
    TagInputModule
  ],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class LayoutViewModule { }
