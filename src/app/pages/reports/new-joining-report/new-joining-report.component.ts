import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { RestService } from 'src/app/services/rest.service';
import { AlertService } from 'src/app/services/alerts.service';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';
(window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-new-joining-report',
  templateUrl: './new-joining-report.component.html',
  styleUrls: ['./new-joining-report.component.scss']
})
export class NewJoiningReportComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  teamsList: any = [];
  // newJoinerData: any=[];
  tabLabel: string = 'Designation List';
  designationColumns: string[] = ['id', 'firstName', 'lastName', 'dob', 'mobile', 'email', 'actions'];
  employelist: any[] = [];
  departmentList: any;
  startDate: Date | undefined | null;
  endDate: Date | undefined | null;
  date: Date;
  selectedExportOption: string = 'Export as PDF'; // Default label


  ngOnInit(): void {
    // this.initEmpList();
    this.initTeamslist();
    // this.initNewJData();
    this.date = new Date();
  }

  constructor(public restApi: RestService,
    private alert: AlertService,
    private datePipe: DatePipe, private snackBar: MatSnackBar) {
  }
  selected = 'DEPT000'

  newJoiningData = new FormGroup({
    team: new FormControl('DEPT000', Validators.required)
  });

  dataSource: any[] = [
    { id: 1, firstName: 'Chandra', lastName: 'R&D', dob: '08-02-2023', mobile: '1234567890', email: 'john.doe@example.com' },
    { id: 2, firstName: 'Ashok', lastName: 'R&D', dob: '27-02-2023', mobile: '1234567890', email: 'jane.smith@example.com' },
    // Add more static data objects as needed
  ];


  EmployeeData = new FormGroup({
    team: new FormControl('0', Validators.required),
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    option: new FormControl('doc', Validators.required)
  });


  GetData(mode: string) {
    const teamname = this.EmployeeData.value.team;
    // const option = this.EmployeeData.value.option;
    const startDate = this.getFormattedDate(this.EmployeeData.value.start);
    const endDate = this.getFormattedDate(this.EmployeeData.value.end);
    if (this.EmployeeData.valid) {
      this.restApi.getService('api/web/v1/pdf/newJoinReport' + '?startDate=' + startDate + '&endDate=' + endDate + '&' + 'team=' + teamname).subscribe((resp: any) => {
        
        if (resp.respCode === 'HMS_00') {
          this.employelist = resp.data;
         
          if (mode == 'pdf') {
            this.selectedExportOption = `Export as ${mode.toUpperCase()}`;
            this.generatePDF(this.employelist, startDate, endDate);
          }
          if (mode == 'xlsx') {
            this.selectedExportOption = `Export as ${mode.toUpperCase()}`;
            this.generateXLSX(this.employelist);
          }

        }
        if (resp.respCode !== 'HMS_00') {
          console.log('no data');
          this.alert.showAlert(resp.respStatus, resp.message)
        }
      }, (err: any) => {
        
      });
    } else {
      this.showToast('Please check the input');
    }
  }
  showToast(msg: string) {
    this.snackBar.open(msg, 'Dismiss', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }


  resetForm() {
    this.startDate = undefined;
    this.endDate = undefined;
  }


  initTeamslist() {
    this.restApi.getService('api/web/v1/display/all/teamdetails',).subscribe(
      (resp: any) => {
        this.departmentList = resp.data;
      }, (err: any) => {
        
      }
    );
  }


  getFormattedDate(date: any): string {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const day = ('0' + dateObj.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }


  async generatePDF(employeeList: any[], startDate: any, endDate: any) {
    if (employeeList.length === 0) {
      // Handle the case when there is no employee data
      console.error('No employee data to generate PDF.');
      this.alert.showFailedAlert('Oops', 'No employee data to generate PDF.');
      return;
    }
    console.log(employeeList[0]);

    const item = Object.keys(employeeList[0]);
    const headerName = ['Emp id', 'Emp Name', 'Res Address', 'Com Address', 'Dob', 'Previous Employer', 'Previous Exp', 'Doj', 'Doc', 'Qualifications', 'Team', 'Designation', 'Worklocation', 'Email Id', 'Mobile No', 'Requirement Type', 'Gender', 'Category', 'Father Name'];


    // const headers = item.map((res: any) => {
    //   return res.charAt(0).toUpperCase() + res.substr(1).toLowerCase();
    // });
    // console.log(headers)


    const tableHeader = headerName.map((header) => ({
      text: header,
      style: 'tableHeader',
    }));

    const tableData = [tableHeader];

    employeeList.forEach((employee) => {
      const rowData = item.map((header) => ({
        text: employee[header] !== null ? employee[header].toString() : '',
        style: 'tableData',
        // alignment: 'center', // Adjust the alignment as needed
      }));
      tableData.push(rowData);
    });

    const docDefinition: any = {
      pageOrientation: 'landscape',
      pageSize: 'A4',
      watermark: { text: 'CashLink Global System Pvt.Ltd.', style: 'watermarkStyle', opacity: 0.1 },
      // header: 'simple text',
      footer: {
        columns: [
          // 'Left part',
          { text: 'Authorized signature and seal', alignment: 'right', style: 'footer' }
        ]
      },
      content: [
        {
          alignment: 'justify',
          columns: [
            {
              fit: [100, 100],
                 image: await this.getBase64ImageFromURL("assets/imgs/cashlink-logo.png"),
            },
            {
              width: '*',
              type: 'none',
              fit: [100, 100],
              style: 'address',
              alignment: 'right',
              ol: [
                'CashLink Global System Pvt.Ltd.',
                'No.5 Mezzanine Floor, Thapar House',
                '37, Montieth Road , Egmore',
                'chennai - 600 008 , India',
              ]
            },]
        },
        { text: 'New joining Report', style: 'header' },
        {
          alignment: 'justify',
          columns: [
            {
              text: 'Date: ' + this.datePipe.transform(startDate, 'dd/MM/yyyy') + ' - ' + this.datePipe.transform(endDate, 'dd/MM/yyyy'),
            },
          ],
          margin: [0, 20]
        },
        {
          table: {
            headerRows: 1,
            // widths: [55, 55, 55, 45, 45, 45, 60, 60, 60, 60, 60, 50], // Adjust column widths as needed
            body: tableData,
          },
        },
      ],

      styles: {
        watermarkStyle: {
          color: 'grey', bold: true, italics: false
        },
        image: {
          alignment: 'center',
          opacity: 0.5,
        },
        header: {
          fontSize: 20,
          bold: true,
          alignment: 'center',
          margin: [50, 10, 50, 10],
          color: '#401164'
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableHeader: {
          bold: true,
          fontSize: 5.5,
          fillColor: '#F2F2F2',
          alignment: 'center', // Adjust the alignment as needed
        },
        tableData: {
          fontSize: 4, // Reduce font size
        },
        address: {
          fontsize: 10,
        },
        date: {
          decoration: 'underline'
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        footer: {
          margin: [0, 0, 40, 50],
          alignment: 'right',
          italics: true
        }
      },
    };
    pdfMake.createPdf(docDefinition).open();
  }


  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }


  generateXLSX(employeeList: any[]) {
    if (employeeList.length === 0) {
      this.alert.showFailedAlert('Oops', 'No employee data to generate XLSX.');
      return;
    }

    // Create a worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(employeeList);

    // Create a workbook with the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Employee Data');

    // Save the workbook to a file
    XLSX.writeFile(wb, 'employee_data.xlsx');
  }


}