import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from 'src/app/services/alerts.service';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { DatePipe } from '@angular/common';
(window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-audit-report',
  templateUrl: './audit-report.component.html',
  styleUrls: ['./audit-report.component.scss']
})
export class AuditReportComponent implements OnInit {
  profiles: any;
  startDate: Date | undefined | null;
  endDate: Date | undefined | null;
  employelist: any;
  selectedExportOption: string = 'Export as PDF'; // Default label


  constructor(private rest: RestService,
    public snackBar: MatSnackBar,
    public alert: AlertService,
    public global: GlobalService,
    private datePipe: DatePipe,) {

  }

  EmployeeData = new FormGroup({
    usersname: new FormControl('ALL', Validators.required),
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    activity: new FormControl('ALL', Validators.required)
  });
  ngOnInit(): void {
    this.getusernames();
  }


  getusernames() {
    this.rest.getService('auth/web/v1/get/UserName').subscribe(
      (res: any) => {
        this.profiles = res.data;
        console.log(res);
      });
  }




  getFormattedDate(date: any): string {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const day = ('0' + dateObj.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }


  GetData(mode: string) {
    const usersname = this.EmployeeData.value.usersname;
    const activity = this.EmployeeData.value.activity;
    const startDate = this.getFormattedDate(this.EmployeeData.value.start);
    const endDate = this.getFormattedDate(this.EmployeeData.value.end);
    if (this.EmployeeData.valid) {
      this.rest.getService('api/web/v1/pdf/auditingReport?startDate=' + startDate + '&endDate=' + endDate + '&flag=' + activity + '&userName=' + usersname).subscribe((resp: any) => {
        
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



  async generatePDF(employeeList: any[], startDate: any, endDate: any) {
    if (employeeList.length === 0) {
      // Handle the case when there is no employee data
      console.error('No employee data to generate PDF.');
      this.alert.showFailedAlert('Oops', 'No employee data to generate PDF.');
      return;
    }

    const item = Object.keys(employeeList[0]);
    const headerName = ['Time stamp', 'User Name', 'Email Id', 'Activity', 'Description', 'Ip Address', 'Name'];
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
        { text: 'Auditing Report', style: 'header' },
        {
          alignment: 'justify',
          columns: [
            {
              //this.datePipe.transform(formData.dob, 'dd-MM-yyyy');
              text: 'Date: ' + this.datePipe.transform(startDate, 'dd/MM/yyyy') + ' - ' + this.datePipe.transform(endDate, 'dd/MM/yyyy'),
            }
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
          fontSize: 9.5,
          fillColor: '#F2F2F2',
          alignment: 'center', // Adjust the alignment as needed
        },
        tableData: {
          fontSize: 8.5, // Reduce font size
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

  showToast(msg: string) {
    this.snackBar.open(msg, 'Dismiss', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
