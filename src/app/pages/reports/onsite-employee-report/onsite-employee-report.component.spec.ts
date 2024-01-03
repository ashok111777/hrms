import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsiteEmployeeReportComponent } from './onsite-employee-report.component';

describe('OnsiteEmployeeReportComponent', () => {
  let component: OnsiteEmployeeReportComponent;
  let fixture: ComponentFixture<OnsiteEmployeeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnsiteEmployeeReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnsiteEmployeeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
