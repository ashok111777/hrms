import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJoiningReportComponent } from './new-joining-report.component';

describe('NewJoiningReportComponent', () => {
  let component: NewJoiningReportComponent;
  let fixture: ComponentFixture<NewJoiningReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewJoiningReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewJoiningReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
