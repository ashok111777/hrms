import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentDetailsComponent } from 'src/app/components/department-details/department-details.component';
import { ProductmgmtDetailsComponent } from 'src/app/components/productmgmt-details/productmgmt-details.component';
import { GlobalService } from 'src/app/services/global.service';
import { LoaderService } from 'src/app/services/loader.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-product-mgmt',
  templateUrl: './product-mgmt.component.html',
  styleUrls: ['./product-mgmt.component.scss']
})
export class ProductMgmtComponent {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  departments: Dept[] = [];
  // dataSource = new MatTableDataSource<Department>(this.departments);
  dataSource: MatTableDataSource<Dept>;
  selectedTab: string = '0';
  tabLabel: string = 'Department List';
  departmentColumns: string[] = ['id', 'name', 'description', 'actions'];
  deparmentFormGroup = new FormGroup({
    deptName: new FormControl('', [Validators.required,]),
    description: new FormControl('', [Validators.required,]),
  });
  constructor(
    private rest: RestService,
    public dialog: MatDialog,
    public global: GlobalService,
    public restApi: RestService,
    public loaderService: LoaderService
  ) {
    this.getDepartments();
    this.dataSource = new MatTableDataSource(this.departments);
  }

  ngAfterViewInit(): void {

  }
  filterDepartment(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  async getDepartments() {
    this.rest.getService('api/web/v1/get/product/details').subscribe(
      (res: any) => {
        this.departments = res.data;
        this.dataSource = new MatTableDataSource<Dept>(res.data);
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
      this.tabLabel = 'Department List';
    } else if (ev.selectedIndex == 1) {
      this.tabLabel = 'Add New Department';
    }
  }
  showDetails(data: any, mode: string): void {


    data.mode = mode;
    const dialogRef = this.dialog.open(
      ProductmgmtDetailsComponent, {
      panelClass: 'custom-modal',
      width: '450px',
      data: data,
      closeOnNavigation: true,
      hasBackdrop: true,
      disableClose: true
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('Alert Data: ' + result);
      this.getDepartments();
    });
  }

  askForDeletion(data: any) {
    const dialogRef = this.global.showCnfAlert('Alert', 'Do you want to delete this record?');
    dialogRef.afterClosed().subscribe(result => {
      console.log('Alert Data: ' + result);
      if (result === 'Y') {
        this.deleteEmployee(data);

      }
      if (result === 'N') {
        const dialogRef = this.global.showToast('you cancelled the request');
      };

    });
  }


  deleteEmployee(data: any) {
    console.log('id' + data);

    this.restApi.putData('api/web/v1/delete/products/' + data.id).subscribe(
      (resp: any) => {
        if (resp.respCode === 'HMS_00' || resp.respCode === 'HMS_00') {
          const dialogRef = this.global.showSuccessAlert(resp.respStatus, resp.data);
          this.getDepartments();
        }
        else {
          this.global.showAlert(resp.respStatus, resp.message);
          
        }
      }, (err: any) => {
        if (err.respCode === 'HMS_01')
          
        alert(this.global.showAlert);
      }
    )
  }


}

export interface Dept {
  id: string,
  teamName: string,
  description: string
}



