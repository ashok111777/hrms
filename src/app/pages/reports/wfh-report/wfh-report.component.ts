import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Styles, jsPDFDocument } from 'jspdf-autotable';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { AlertService } from 'src/app/services/alerts.service';
import { GlobalService } from 'src/app/services/global.service';
import { LoaderService } from 'src/app/services/loader.service';
import { RestService } from 'src/app/services/rest.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-wfh-report',
  templateUrl: './wfh-report.component.html',
  styleUrls: ['./wfh-report.component.scss']
})
export class WfhReportComponent implements OnInit {
  showContent: boolean = false;
  teamsList: any = [];
  departmentList: any;
  startDate: Date | undefined | null;
  endDate: Date | undefined | null;
  employelist: any[] = [];
  dataToPrint: any[] = [];
  docStyles: Partial<Styles>;
  printHeadStyles: Partial<Styles>;
  printColumns: any[];
  printColumnsStyles: { cellWidth: number; }[];
  readonly dataCount: number = 10;
  imageDataUrl: string;
  selectedExportOption: string = 'Export as PDF'; // Default label
  EmployeeData = new FormGroup({
    team: new FormControl('0', Validators.required),
    start: new FormControl('', Validators.required),
    end: new FormControl('',),
    option: new FormControl('doc',)
  });


  resetForm() {
    this.startDate = undefined;
    this.endDate = undefined;
  }

  constructor(
    public restApi: RestService,
    public alert: AlertService,
    public global: GlobalService,
    public snackBar:MatSnackBar,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.initTeamslist();
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
  GetData(mode: string) {
    const startDate = this.getFormattedDate(this.EmployeeData.value.start);
    const endDate = this.getFormattedDate(this.EmployeeData.value.end);
    if (this.EmployeeData.valid) {

      //http://localhost:8762/api/web/v1/pdf/wfhReport?startDate=2023-08-17&endDate=2023-08-17
      this.restApi.getService('api/web/v1/pdf/wfhReport' + '?startDate=' + startDate + '&endDate=' + endDate).subscribe((resp: any) => {
        
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
    }
    else {
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
  



  async generatePDF(employeeList: any[], startDate: any, endDate: any) {
    if (employeeList.length === 0) {
      // Handle the case when there is no employee data
      console.error('No employee data to generate PDF.');
      this.alert.showFailedAlert('Oops', 'No employee data to generate PDF.');
      return;
    }

    const item = Object.keys(employeeList[0]);

    const headerName = [
      "Emp Id",
      "Name",
      "Department",
      "Designation",
      "Date",
      "Wfh Taken"
    ];

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
      // pageOrientation: 'landscape',
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
        { text: 'WORK FROM HOME REPORT', style: 'header' },
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
            // width: ['*', '*', '*', '*', '*', 'auto'],
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
          fontSize: 11,
          fillColor: '#F2F2F2',
          alignment: 'center',
          // Adjust the alignment as needed
        },
        tableData: {
          fontSize: 9, // Reduce font size
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

  xlsx() {
    this.generateXLSX(this.employelist);
  }

  generateXLSX(employeeList: any[]) {
    if (employeeList.length === 0) {
      console.error('No employee data to generate XLSX.');
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


  //http://localhost:8762/api/web/v1/pdf/wfhReport?startDate=2023-08-17&endDate=2023-08-17

}
