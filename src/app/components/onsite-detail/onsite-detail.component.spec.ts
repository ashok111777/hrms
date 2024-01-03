import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsiteDetailComponent } from './onsite-detail.component';

describe('OnsiteDetailComponent', () => {
  let component: OnsiteDetailComponent;
  let fixture: ComponentFixture<OnsiteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnsiteDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnsiteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
