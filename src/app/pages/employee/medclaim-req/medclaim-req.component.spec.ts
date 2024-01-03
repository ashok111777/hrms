import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedclaimReqComponent } from './medclaim-req.component';

describe('MedclaimReqComponent', () => {
  let component: MedclaimReqComponent;
  let fixture: ComponentFixture<MedclaimReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedclaimReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedclaimReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
