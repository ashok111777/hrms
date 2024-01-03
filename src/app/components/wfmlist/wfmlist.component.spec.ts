import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WFMlistComponent } from './wfmlist.component';

describe('WFMlistComponent', () => {
  let component: WFMlistComponent;
  let fixture: ComponentFixture<WFMlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WFMlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WFMlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
