import { Component, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from 'src/app/services/rest.service';
import { InstituteDetailComponent } from 'src/app/components/institute-detail/institute-detail.component';
import { LoaderService } from 'src/app/services/loader.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-institute-mgmt',
  templateUrl: './institute-mgmt.component.html',
  styleUrls: ['./institute-mgmt.component.scss']
})
export class InstituteMgmtComponent implements AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  institutes: Inst[] = [];
  dataSource: MatTableDataSource<Inst>;
  selectedTab: string = '0';
  tabLabel: string = 'Designation List';
  designationColumns: string[] = ['insId', 'name', 'description', 'actions'];
  designationFormGroup = new FormGroup({
    desigName: new FormControl('', [Validators.required,]),
    description: new FormControl('', [Validators.required,]),
  });
  constructor(
    private rest: RestService,
    public dialog: MatDialog,
    public loaderService: LoaderService,
    public global: GlobalService,
  ) {
    
  }

  ngOnInit() {
    this.getInstitute();
  }

  ngAfterViewInit(): void {
    this.getInstitute();
  }

  filterInstitute(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  async getInstitute() {
    this.rest.getService('api/web/v1/get/institude/names').subscribe(
      (res: any) => {
        this.institutes = res.data;
        this.dataSource = new MatTableDataSource<Inst>(this.institutes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (err: any) => {
        console.log('Got Error: ' + JSON.stringify(err));
      }
    );
  }
  tabChanged(ev: any) {
    console.log(ev.selectedIndex);
    if (ev.selectedIndex == 0) {
      this.tabLabel = 'Designation List';
    } else if (ev.selectedIndex == 1) {
      this.tabLabel = 'Add New Designation';
    }
  }
  showDetails(data: any, mode: string): void {
    

    data.mode = mode;
    const dialogRef = this.dialog.open(
      InstituteDetailComponent, {
      panelClass: 'custom-modal',
      width: '450px',
      data: data,
      closeOnNavigation: true,
      hasBackdrop: true,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.getInstitute();
    });
  }



  
 
  askForDeletion(data: any) {
    const dialogRef = this.global.showCnfAlert('Alert', 'Do you want to delete this record?');
    dialogRef.afterClosed().subscribe(result => {
      console.log('Alert Data: ' + result);
      if (result === 'Y') {
        this.deleteEmployee(data);
       
      }
      if( result === 'N'){
        const dialogRef = this.global.showToast( 'you cancelled the request');
      };
    });
  }
  

  deleteEmployee(data: any) {
    console.log('id' + data);
    this.rest.putData('api/web/v1//delete/institude/byid/' + data.insId).subscribe(
      (resp: any) => {
        if (resp.respCode === 'HMS_00') {  
          const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data); 
          this.getInstitute();
        }
      }, (err: any) => {
        if (err.respCode === 'HMS_01')
        
        alert(this.global.showAlert);
        this.getInstitute();
      }
    )
  }
}

export interface Inst {
  insId: string,
  name: string,
  description: string
}
