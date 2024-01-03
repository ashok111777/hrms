import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { RestService } from 'src/app/services/rest.service';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { AlertService } from 'src/app/services/alerts.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Styles } from 'jspdf-autotable';
import { GlobalService } from 'src/app/services/global.service';
import * as XLSX from 'xlsx';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
(window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-attendance-reports',
  templateUrl: './attendance-reports.component.html',
  styleUrls: ['./attendance-reports.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AttendanceReportsComponent implements OnInit {
  showContent: boolean = false;
  selectedExportOption: string = 'Export as PDF'; // Default label
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
  selectedDate: Date | null;
  selectedMonth: number;
  selectedYear: number;

  EmployeeData = new FormGroup({
    team: new FormControl('0', Validators.required),
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    option: new FormControl('doc', Validators.required),
  });
  date = new FormControl(moment());
  currentMonth: string;



  setMonthAndYear(normalizedMonthAndYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    this.selectedMonth = normalizedMonthAndYear.month() + 1; // Adding 1 because months are zero-based
    this.selectedYear = normalizedMonthAndYear.year();
    this.date.setValue(moment({ year: this.selectedYear, month: this.selectedMonth - 1 })); // Update the input value
    datepicker.close();
  }


  resetForm() {
    this.date.patchValue(null);
  }

  constructor(
    public restApi: RestService,
    public alert: AlertService,
    public global: GlobalService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initTeamslist();
    this.date.patchValue(null);
    this.currentMonth = moment().format('MMMM YYYY');
  }

  initTeamslist() {
    this.restApi.getService('api/web/v1/display/all/teamdetails',).subscribe(
      (resp: any) => {
        this.departmentList = resp.data;
      }, (err: any) => {
        
      }
    );
  }

  GetData(mode: string) {
    const month = this.selectedMonth;
    const year = this.selectedYear;
    if (month && year) {
      this.restApi.getService(`api/web/v1/pdf/attendanceReport?month=${month}&year=${year}`)
        .subscribe(async (resp: any) => {
          
          if (resp.respCode === 'HMS_00') {
            this.employelist = resp.data;
           
            if (mode == 'pdf') {
              this.selectedExportOption = `Export as ${mode.toUpperCase()}`;
              this.generatePDF(this.employelist, month, year);
            }
            if (mode == 'xlsx') {
              this.selectedExportOption = `Export as ${mode.toUpperCase()}`;
             await this.generateXLSX(this.employelist);
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




  async generatePDF(employeeList: any[], month: number, year: number) {
    if (employeeList.length === 0) {
      // Handle the case when there is no employee data
      console.error('No employee data to generate PDF.');
      this.alert.showFailedAlert('Oops', 'No employee data to generate PDF.');
      return;
    }

    const item = Object.keys(employeeList[0]);

    // const headername = [
    //   "Emp Id",
    //   "Emp Name",
    //   "Doj",
    //   "Leave Taken",
    //   "Present days",
    //   "Holidays",
    //   "Leave Eligiblity",
    //   "Opn Bln Current Month",
    //   "Cls Bln Current Month",
    //   "Lop",
    //   "Prv Month Closing Balance"
    // ];
    const headers = item.map((res: any) => {
      return res.charAt(0).toUpperCase() + res.substr(1).toLowerCase();
    });
    console.log(headers)

    const numColumns = headers.length;

    const tableHeader = headers.map((header) => ({
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
        { text: 'Attendance Report', style: 'header' },
        {
          alignment: 'justify',
          columns: [
            {
              text: 'Date: ' + this.currentMonth,
            },
            // {
            //   alignment: 'right',
            //   text: 'Year:' + year,
            // }
          ],
          margin: [0, 20]
        },
        {
          table: {
            headerRows: 1,
            // widths: [50, 50, 50, 80, 80, 80, 100, 100, 100, 100], // Adjust column widths as needed
            layout: 'noBorders', // Remove table borders
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
          fontSize: 18,
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
          fontSize: 6,
          fillColor: '#F2F2F2',
          alignment: 'center', // Adjust the alignment as needed
        },
        tableData: {
          fontSize: 6, // Reduce font size
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



}