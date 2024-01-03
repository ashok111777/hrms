import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatecomeReportComponent } from './latecome-report.component';

describe('LatecomeReportComponent', () => {
  let component: LatecomeReportComponent;
  let fixture: ComponentFixture<LatecomeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatecomeReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatecomeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
