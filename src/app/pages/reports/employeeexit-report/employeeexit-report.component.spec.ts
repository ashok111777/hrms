import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeexitReportComponent } from './employeeexit-report.component';

describe('EmployeeexitReportComponent', () => {
  let component: EmployeeexitReportComponent;
  let fixture: ComponentFixture<EmployeeexitReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeexitReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeexitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
