import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeDetailComponent } from 'src/app/components/employee-detail/employee-detail.component';
import { CommunicationDetail, EmployeeDetail, EmployeePersonalDetail, ProfessionalDetail, ResidentialDetail } from 'src/app/models/Employee';
import { AlertService } from 'src/app/services/alerts.service';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  showViewEmpDetailPage: boolean;
  empList: EmployeeDetail[] = [];
  empDetail: EmployeeDetail;
  dataSource: MatTableDataSource<any>;
  empColumns: string[] = ['employeeId', 'firstName', 'lastName', 'teamName', 'designation', 'doj', 'actions'];
  employelist: any;
  deletingEmployee = false;

  constructor(

    public dialog: MatDialog,
    public global: GlobalService,
    public _bottomSheet: MatBottomSheet,
    public restApi: RestService,
    private router: Router,
    private bottomSheet: MatBottomSheet,
    public alertService: AlertService,
  ) {
    this.initDetails();
  }

  ngAfterViewInit(): void { }
  ngOnInit(): void {

  }
  initDetails() {
    this.restApi.getService('api/web/v1/display/employee/all',).subscribe(
      (resp: any) => {
        this.employelist = resp.data;
        this.dataSource = new MatTableDataSource<any>(this.employelist);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (err: any) => {
        
        if (err.respCode === 'HMS_02') {
          this.global.showAlert('401 Unauthorized response', 'token not found in the header');
        }
        if (err.net) {
          this.global.showAlert('INTERNET_DISCONNECTED', 'pls Check the internet');
        }
      }
    )
  }

  filterUser(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  showDetails(data: any, mode: string): void {
    data.mode = mode;
    this.restApi.getService('api/web/v1/employee/list/' + data.employeeId,).subscribe(
      (resp: any) => {
        if (resp.respCode === 'HMS_00') {
          this.prepareEmployeeDetails(resp.data, mode);
        }
        if (resp.respCode !== 'HMS_00') {
          this.alertService.showFailedAlert(resp.respStatus, resp.message);
        }
      }, (err: any) => {
        
        if (err.respCode === 'HMS_01') {
          this.global.showAlert('404 Page Not Found', 'internal server error');
        }
      }
    )
  }

  askForDeletion(data: any) {
    const dialogRef = this.global.showCnfAlert('Alert', 'Do you want to delete this record?');
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'Y') {
        this.deleteEmployee(data);
      }
      if (result === 'N') {
        const dialogRef = this.global.showToast('you cancelled the request');
      };
    });
  }

  deleteEmployee(data: any) {
    this.deletingEmployee = true;
    this.restApi.putData('api/web/v1/delete/' + data.employeeId).subscribe(
      (resp: any) => {
        if (resp.respCode === 'HMS_00' || resp.respCode === 'HMS_00') {
          this.deletingEmployee = false;
          this.initDetails();
          const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data);
        }
      }, (err: any) => {
        
        this.deletingEmployee = false;
      }
    )
  }
  closeEmpDetail() {
    this.showViewEmpDetailPage = false;
  }
  prepareEmployeeDetails(resp: any, mode: any) {

    //this personal details
    const personalDetail: EmployeePersonalDetail = new EmployeePersonalDetail();
    personalDetail.id = resp.employeeId;
    personalDetail.firstName = resp.firstName;
    personalDetail.lastName = resp.lastName;
    personalDetail.mobileNo = resp.mobileNumber;
    personalDetail.emailId = resp.emailId;
    personalDetail.gender = resp.gender;
    personalDetail.dob = resp.dob;
    personalDetail.motherName = resp.motherName;
    personalDetail.fatherName = resp.fatherName;

    //residentail details
    const residentialDetail: ResidentialDetail = new ResidentialDetail();
    residentialDetail.street = resp.resDoorNo;
    residentialDetail.village = resp.resVillage;
    residentialDetail.city = resp.resCity;
    residentialDetail.district = resp.resDistrict;
    residentialDetail.state = resp.resState;
    residentialDetail.zipcode = resp.resZip;
    residentialDetail.country = resp.resCountry;

    //comunication details
    const communicationDetail: CommunicationDetail = new CommunicationDetail();
    communicationDetail.street = resp.comDoorNo;
    communicationDetail.village = resp.comVillage;
    communicationDetail.city = resp.comCity;
    communicationDetail.district = resp.comDistrict;
    communicationDetail.state = resp.comState;
    communicationDetail.zipcode = resp.comZip;
    communicationDetail.country = resp.comCountry;

    //professional details here
    const professionalDetail: ProfessionalDetail = new ProfessionalDetail();

    professionalDetail.Category = resp.category;
    professionalDetail.Geography = resp.geography;
    professionalDetail.PreviousDesignation = resp.previousDesignation;
    professionalDetail.PreviousEmployer = resp.previousEmployer;
    professionalDetail.PreviousExperience = resp.previousExp;
    professionalDetail.teamName = resp.teamName.id;
    professionalDetail.designation = resp.designation.id;
    professionalDetail.qualifications = resp.qualifications;
    professionalDetail.experience = resp.experience;
    professionalDetail.Workloaction = resp.workLocation;
    professionalDetail.doc = resp.doc;
    professionalDetail.doj = resp.doj;
    professionalDetail.Totalexperience = resp.Totalexperience;
    professionalDetail.empType = resp.empType;
    professionalDetail.AdditionReplacement = resp.requirementType;


    let previewImage = resp.profileUrl

    const empdata: EmployeeDetail = {
      profileurl: previewImage,
      personalDetail: personalDetail,
      residentialDetail: residentialDetail,
      communicationDetail: communicationDetail,
      professionalDetail: professionalDetail,

    }
    this.empDetail = empdata;
    this.showViewEmpDetailPage = true;
    this.displayempdetail(empdata, mode);

  }
  openPage(page: string) {
    this.router.navigateByUrl(page);
  }
  displayempdetail(data: any, mode: any) {
    data.mode = mode
    const bottomSheetRef: MatBottomSheetRef<EmployeeDetailComponent> = this.bottomSheet.open(EmployeeDetailComponent, {
      hasBackdrop: true,
      disableClose: true,
      panelClass: 'bottom-sheet-container',
      closeOnNavigation: true,
      ariaLabel: 'Add New User',
      data: data
    });
    bottomSheetRef.afterDismissed().subscribe((returnedData) => {
      // Handle the returned data here
      // Do something with the returned data
      this.initDetails();
    });
  }


}



