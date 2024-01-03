import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceStatusComponent } from './attendence-status.component';

describe('AttendenceStatusComponent', () => {
  let component: AttendenceStatusComponent;
  let fixture: ComponentFixture<AttendenceStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendenceStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendenceStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
