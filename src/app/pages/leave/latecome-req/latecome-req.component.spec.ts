import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatecomeReqComponent } from './latecome-req.component';

describe('LatecomeReqComponent', () => {
  let component: LatecomeReqComponent;
  let fixture: ComponentFixture<LatecomeReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatecomeReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatecomeReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
