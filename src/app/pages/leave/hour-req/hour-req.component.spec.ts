import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourReqComponent } from './hour-req.component';

describe('HourReqComponent', () => {
  let component: HourReqComponent;
  let fixture: ComponentFixture<HourReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
