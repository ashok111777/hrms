import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WfmStatusComponent } from './wfm-status.component';

describe('WfmStatusComponent', () => {
  let component: WfmStatusComponent;
  let fixture: ComponentFixture<WfmStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WfmStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WfmStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
