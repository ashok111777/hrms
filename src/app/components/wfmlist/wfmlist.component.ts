import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserLocationsComponent } from '../user-locations/user-locations.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-wfmlist',
  templateUrl: './wfmlist.component.html',
  styleUrls: ['./wfmlist.component.scss']
})
export class WFMlistComponent implements OnInit {
  @Input() showTable: boolean = false;
  @Output() closeTable: EventEmitter<void> = new EventEmitter<void>();
  dataSource: MatTableDataSource<any>;
  WFmColumns: string[] = ['slNo', 'name', 'team', 'designation', 'inTime', 'outTime', 'actions'];
  Wfmlist: any[] = [
    { slNo: 1, name: 'John Doe', team: 'Development', designation: 'Software Engineer', inTime: '09:00 AM', outTime: '05:00 PM', action: 'Edit' },
    { slNo: 2, name: 'Jane Smith', team: 'Design', designation: 'UI/UX Designer', inTime: '10:00 AM', outTime: '06:00 PM', action: 'Edit' },
    // Add more rows as needed
  ];
  constructor(private router: Router,
    public dialog: MatDialog,) {
  }

  ngOnInit(): void {}
  
  showDetails(data: any, mode: string): void {
    data.mode = mode;
    const dialogRef = this.dialog.open(
      UserLocationsComponent, {
      panelClass: 'custom-modal',
      width: '100%',
      data: data,
      closeOnNavigation: true,
      hasBackdrop: true,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Alert Data: ' + result);
    });
  }

  filterUser(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleTable(): void {
    this.showTable = !this.showTable;
  }

  onBackButtonClick(): void {
    this.closeTable.emit();
  }
}
