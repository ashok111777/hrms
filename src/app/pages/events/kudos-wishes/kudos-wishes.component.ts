import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WishTemplatesComponent } from 'src/app/components/wish-templates/wish-templates.component';

@Component({
  selector: 'app-kudos-wishes',
  templateUrl: './kudos-wishes.component.html',
  styleUrls: ['./kudos-wishes.component.scss']
})
export class KudosWishesComponent implements OnInit {
  @ViewChild(MatPaginator) Paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  kudoslist: any[] = [];
  dataSource!: MatTableDataSource<any>;
  displayedcolumns: string[] = ['empId', 'date', 'name', 'designation', 'actions'];


  constructor(
    public dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.initdetails();
  }

  initdetails() {
    this.kudoslist = [{ empId: 45, date: '02-08-23', name: 'Suryakant', designation: 'TeamLead' },
    { empId: 987, date: '01-06-23', name: 'Ritunjay', designation: 'Tainee' },
    { empId: 1010, date: '02-08-23', name: 'chandra', designation: 'SoftwareEngineer' },
    { empId: 1048, date: '04-10-23', name: 'Ashok', designation: 'SoftwareEngineer' },
    { empId: 1049, date: '02-09-23', name: 'Damini', designation: 'SoftwareEngineer' },
    { empId: 1052, date: '02-11-23', name: 'Deepen', designation: 'SoftwareEngineer' },]

    this.dataSource = new MatTableDataSource<any>(this.kudoslist);
    this.dataSource.paginator = this.Paginator;
  }

  showDetails(data: any, mode: string): void {
    data.mode = mode;
    
  }


}
