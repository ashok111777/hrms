import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import * as ApexCharts from 'apexcharts';
import { __values } from 'tslib';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as moment from 'moment';
import * as Highcharts from 'highcharts';
import HPie from 'highcharts/modules/variable-pie';
HPie(Highcharts);
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend
} from "ng-apexcharts";
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material/dialog';
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentDate: Date;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  date: any;
  eventdetail: any
  birthday: any
  bdaynames: any = [];
  newjoingname: any
  newjoindetails: any
  workAnniversaryname: any
  workdetailsname: any;
  employeedetails: any = [];
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'designation', 'doj', 'teamName'];
  circlechart: any;
  weeklyAttendanceData: any[] = [];
  dates: any[];
  wfm: any;
  leave: any;
  present: any;
  currentMonth: string;
  chartOptions: any;
  Highcharts = Highcharts;
  chart: Highcharts.Chart;
  updateFlag: boolean;
  constructor(
    private rest: RestService,
    private datePipe: DatePipe,
    private globalService: GlobalService,
    public dialog: MatDialog,
  ) {
    

  }

  ngOnInit(): void {
    this.currentMonth = moment().format('MMMM YYYY');
    this.getUsers();
    this.tabledetails();
    this.initChart();
  }



  initChart() {
    this.chartOptions = {
      chart: {
        type: 'variablepie'
      },
      // accessibility: {
      //   description: 'A variable radius pie chart'
      // },
      // title: { 
      //   // text: 'Team strength.'
      // },
      // tooltip: {
      //   headerFormat: '',
      //   pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
      //     'Area (square km): <b>{point.y}</b><br/>' +
      //     'Population density (people per square km): <b>{point.z}</b><br/>'
      // },
      series: [{
        minPointSize: 10,
        innerSize: '20%',
        zMin: 0,
        name: 'countries',
        data: [{
          name: 'Spain',
          y: 505370,
          z: 92.9
        }, {
          name: 'France',
          y: 551500,
          z: 118.7
        }, {
          name: 'Poland',
          y: 312685,
          z: 124.6
        }, {
          name: 'Czech Republic',
          y: 78867,
          z: 137.5
        }, {
          name: 'Italy',
          y: 301340,
          z: 201.8
        }, {
          name: 'Switzerland',
          y: 41277,
          z: 214.5
        }, {
          name: 'Germany',
          y: 357022,
          z: 235.6
        }]
      }]
    }
  }



  formatDate(date: string): string | null {
    const formattedDate = this.datePipe.transform(date, 'dd MMM yyyy');
    return formattedDate;
  }

  tabledetails() {
    this.rest.getService('api/web/v1/probation/information/within-month').subscribe((resp: any) => {
      this.employeedetails = resp.data;
      this.dataSource = new MatTableDataSource<any>(this.employeedetails);
      this.dataSource.paginator = this.paginator;
    }, (err: any) => {
      console.log('Got Error: ' + JSON.stringify(err));
    })
  }

  eventsdetails() {
    this.rest.getService('api/web/v1/display/all/eventDetails').subscribe((res: any) => {
      this.eventdetail = res.data
      this.birthday = res.data.birthday.details
      this.bdaynames = this.birthday.map((item: { name: any; }) => item.name);
      this.newjoingname = res.data.newJoining.details
      this.newjoindetails = this.newjoingname.map((item: { name: any; }) => item.name);
      this.workAnniversaryname = res.data.workAnniversary.details
      this.workdetailsname = this.workAnniversaryname.map((item: { name: any; }) => item.name);
    }, (err: any) => {
      console.log('Got Error: ' + JSON.stringify(err));
    });
  }


  async getUsers() {
    try {
      const res: any = await this.rest.getService('api/web/v1/display/dashboard1').toPromise();

      if (res && res.data) {
        this.circlechart = res.data;
        this.weeklyAttendanceData = res.data.weeklyAttendanceData;

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
            categories: this.dates.map((date) => {
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
            position: 'bottom',

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

}




