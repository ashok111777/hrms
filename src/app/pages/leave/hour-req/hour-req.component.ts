import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig, } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmpListComponent } from '../emp-list/emp-list.component';
import { MatPaginator } from '@angular/material/paginator';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-hour-req',
  templateUrl: './hour-req.component.html',
  styleUrls: ['./hour-req.component.scss']
})
export class HourReqComponent implements OnInit {

  empDetail: string[] = ['id', 'Name', 'team', 'mobile', 'designation', 'logInTime', 'actions'];
  empList: any[] = [];
  dataSource: MatTableDataSource<any>;
  tabLabel: string = 'empList';
  teamsList: any[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.initEmpList();
    this.initTeamslist();

  }

  initTeamslist() {
    this.teamsList = [
      { deptId: 'DEPT001', deptName: 'StarMPay' },
      { deptId: 'DEPT002', deptName: 'StarIFPS' },
      { deptId: 'DEPT003', deptName: 'StarRecon' },
      { deptId: 'DEPT004', deptName: 'R&D' },
      { deptId: 'DEPT005', deptName: 'StarCardman' },
      { deptId: 'DEPT006', deptName: 'EZSwitch' },
      { deptId: 'DEPT007', deptName: 'StarCAS' },
      { deptId: 'DEPT008', deptName: 'Marketing' },
      { deptId: 'DEPT009', deptName: 'Finance' },
      { deptId: 'DEPT010', deptName: 'Software Support' },
      { deptId: 'DEPT011', deptName: 'HR' },
      { deptId: 'DEPT012', deptName: 'Admin' },
      { deptId: 'DEPT013', deptName: 'Management' },
    ];
  }

  initEmpList() {
    this.empList = [
      { empid: 1, fullName: 'Ashok Kumar', team: 'R&D', mobile: '934505123', designation: 'Software Engineer', logInTime: '09:10:10' },
      { empid: 2, fullName: 'surya ', team: 'R&D', mobile: '735473223', designation: 'Software Engineer', logInTime: '11:17:10' },
      { empid: 3, fullName: 'chandra sekar', team: 'R&D', mobile: '944667722', designation: 'Software Engineer', logInTime: '04:32:32' },
      { empid: 4, fullName: 'rintu', team: 'R&D', mobile: '857543221', designation: 'Software Engineer', logInTime: '08:22:43' },
      { empid: 4, fullName: 'rintu', team: 'R&D', mobile: '857543221', designation: 'Software Engineer', logInTime: '08:22:43' },
      { empid: 4, fullName: 'rintu', team: 'R&D', mobile: '857543221', designation: 'Software Engineer', logInTime: '08:22:43' },
      { empid: 4, fullName: 'rintu', team: 'R&D', mobile: '857543221', designation: 'Software Engineer', logInTime: '08:22:43' },
      { empid: 4, fullName: 'rintu', team: 'R&D', mobile: '857543221', designation: 'Software Engineer', logInTime: '08:22:43' },
      { empid: 4, fullName: 'rintu', team: 'R&D', mobile: '857543221', designation: 'Software Engineer', logInTime: '08:22:43' },
      { empid: 4, fullName: 'rintu', team: 'R&D', mobile: '857543221', designation: 'Software Engineer', logInTime: '08:22:43' },
      { empid: 4, fullName: 'rintu', team: 'R&D', mobile: '857543221', designation: 'Software Engineer', logInTime: '08:22:43' },

    ];
    this.dataSource = new MatTableDataSource<any>(this.empList);
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
  ) {
    this.getUsers();
  }

  filterUser(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  async getUsers() {
    this.dataSource = new MatTableDataSource<any>(this.empList);
  }
  showDetails(data: any, mode: string): void {
    data.mode = mode;
    data.inst = 'CGS';
    const config: MatBottomSheetConfig = {
      hasBackdrop: true,
      disableClose: true,
      panelClass: 'bottom-sheet-container',
      closeOnNavigation: true,
      ariaLabel: 'Add New User',
      data: data
    }
    this._bottomSheet.open(EmpListComponent, config);
  }

  public downloadExcel(): void {
    const data: any = this.empList; // Replace this with your own data retrieval logic
  
    // Convert the data to an Excel workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
    // Generate the Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    // Create a download link element
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(excelData);
    link.download = 'data.xlsx';
    link.click();
  }
  
  pdf() {
    const doc = new jsPDF();
    autoTable(doc, { html: '#pdftable' });
    setTimeout(function() {
        doc.save('pdftable.pdf');
    }, 1000 );
  }

  public downloadExcelid(tableId: any ): void {
    const table = document.getElementById(tableId);
    if (!table) {
      console.error('Table not found');
      return;
    }
  
    // Convert the table to an Excel workbook
    const workbook = XLSX.utils.table_to_book(table, { sheet: 'Sheet1' });
  
    // Generate the Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    // Create a download link element
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(excelData);
    link.download = 'data.xlsx';
    link.click();
  }
  
}



