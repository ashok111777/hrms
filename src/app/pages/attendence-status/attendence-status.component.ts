import {  Component,  OnInit, ViewChild } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import * as ApexCharts from 'apexcharts';
import { MONTH_NAMES } from '../../services/constants.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as moment from 'moment';

@Component({
  selector: 'app-attendence-status',
  templateUrl: './attendence-status.component.html',
  styleUrls: ['./attendence-status.component.scss']
})
export class AttendenceStatusComponent implements OnInit  {

  circlechart: any;
  employeedetails: any;
  newjoingdetails: any[] = [];
  dataSource1: MatTableDataSource<any>;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['sno', 'team', 'present', 'wfh', 'leave'];
  displayedColumns1 = ['sno', 'employeeName', 'team', 'designation', 'experience'];
  displayedColumns2: string[] = ['teamName', 'total'];
  dataSource3: MatTableDataSource<any>;
  teamwisedetails: any[] = [];
  parentdiv: boolean = true;
  showEmployeeTable: boolean = false;
  weeklyAttendanceData: any[] = [];
  dates: any;
  wfm: any;
  leave: any;
  present: any;
  isEditable: boolean = true;
  date: any;
  team: any;
  currentMonth = new Date().getUTCMonth();
  currentMonthName: string;
  month: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private rest: RestService) {

  }

  ngOnInit(): void {
    this.month = moment().format('MMMM YYYY');
    this.getMonthName();
    this.getUsers();
    this.tabledetails();
  }


  getMonthName() {
    this.currentMonthName = MONTH_NAMES.monthNames[Number(this.currentMonth)];
  }

  async getUsers() {
    try {
      const res: any = await this.rest.getService('api/web/v1/display/dashboard1').toPromise();

      if (res && res.data) {
        this.circlechart = res.data;
        this.weeklyAttendanceData = res.data.weeklyAttendanceData;
        this.team = res.data?.attendancePresentData;

        this.dates = this.weeklyAttendanceData.map((item: any) => {
          // Assuming date format is 'DD-MM-YYYY', convert it to a JavaScript Date object
          const parts = item.date.split('-');
          const date = new Date(parts[2], parts[1] - 1, parts[0]);
          return date;
        });

        this.wfm = this.weeklyAttendanceData.map((item: any) => item.wfh);
        this.leave = this.weeklyAttendanceData.map((item: any) => item.leave);
        this.present = this.weeklyAttendanceData.map((item: any) => item.present);

        // Create and render the chart here
        const options = {
          noData: {
            text: 'No data has be there in Database',
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
              color: '#000000',
              fontSize: '14px',
              fontFamily: 'Serif'
            },
          },
          label: {
            datetimeFormatter: {
              year: 'yyyy',
              month: 'MM',
              day: 'dd',
              hour: 'HH:mm'
            },
            borderColor: 'transparent',
            style: {
              color: "red",
              background: 'transparent',
            },
            text: "No Data right now",
            textAnchor: 'start',
            position: 'center',
          },
          series: [{
            name: 'In Office',
            data: this.present
          }, {
            name: 'Work From Home',
            data: this.wfm
          }, {
            name: 'Leave',
            data: this.leave
          },
          ],
          chart: {
            height: 350,
            type: 'area',
            toolbar: {
              show: true
            },
          },

          colors: ['#2eca6a', '#4154f1', '#ff771d'],
          fill: {
            type: "gradient",
            gradient: {
              // shadeIntensity: 1,
              // opacityFrom: 0.3,
              // opacityTo: 0.4,
              // stops: [0, 90, 100]
            }
          },

          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth',
            width: 2
          },
          markers: {
            size: 4
          },
          toolbar: true,
          xaxis: {
            type: 'category',
            categories: this.dates.map((date: string | number | Date) => {
              // Format the date to 'DD-MM-YYYY' format
              const formattedDate = new Date(date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              });
              return formattedDate;
            }),

          },
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350
            }
          },
          tooltip: {
            x: {
              format: 'dd/MMM/yyyy'
            },
          },

        };;
        const chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();

        const pie = {
          series: this.circlechart?.attendancePresentData.counts,
          labels: this.circlechart?.attendancePresentData.teams,
          noData: {
            text: 'No data has be there in Database',
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
              color: '#000000',
              fontSize: '14px',
              fontFamily: 'Serif'
            }
          },
          dataLabels: {
            enabled: false,
          },
          chart: {
            height: 350,
            // width: 380,
            type: 'donut',
          },
          plotOptions: {
            pie: {
              startAngle: -90,
              endAngle: 270
            },
          },
          legend: {
            position: 'bottom'
          },
          toolbar: true,
          fill: {
            type: 'gradient',
          },
          title: {
            // text: 'Gradient Donut with custom Start-angle'
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                // width: 200,
                height: 350,
              },
              legend: {
                position: 'bottom'
              }
            }
          }],
        };
        const piechart = new ApexCharts(document.querySelector("#teamStrength"), pie);
        piechart.render();

      }
    } catch (err) {
      console.log('Got Error: ' + JSON.stringify(err));
    }
  }

  tabledetails() {
    this.rest.getService('api/web/v1/display/dashboard2').subscribe((resp: any) => {      
      this.employeedetails = resp.data?.employeeStatus;
      this.newjoingdetails = resp.data?.newJoinStatuses;
      this.dataSource = new MatTableDataSource<any>(this.employeedetails);
      this.dataSource1 = new MatTableDataSource<any>(this.newjoingdetails);
      this.dataSource1.paginator = this.paginator;
      this.dataSource.paginator = this.paginator;
    }, (err: any) => {
      console.log('Got Error: ' + JSON.stringify(err));
    })
  }

  teamwisedata(value: string) {
    this.rest.getService('api/web/v1/get/teamWIse/data/' + value).subscribe((resp: any) => {
      this.teamwisedetails = resp.data
      this.dataSource3 = new MatTableDataSource<any>(this.teamwisedetails);
    }), (err: any) => {
      console.log('Got Error: ' + JSON.stringify(err));
    }
  }

  hiddenddiv() {
    this.showEmployeeTable = true;
    this.parentdiv = false;
  }

  onCloseTable(): void {
    this.showEmployeeTable = false;
    this.parentdiv = true
  }

}


