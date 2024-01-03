import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbationReportComponent } from './probation-report.component';

describe('ProbationReportComponent', () => {
  let component: ProbationReportComponent;
  let fixture: ComponentFixture<ProbationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProbationReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProbationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
