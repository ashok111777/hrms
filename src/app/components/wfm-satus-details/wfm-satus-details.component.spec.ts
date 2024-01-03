import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WfmSatusDetailsComponent } from './wfm-satus-details.component';

describe('WfmSatusDetailsComponent', () => {
  let component: WfmSatusDetailsComponent;
  let fixture: ComponentFixture<WfmSatusDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WfmSatusDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WfmSatusDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
