import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbationMgmtComponent } from './probation-mgmt.component';

describe('ProbationMgmtComponent', () => {
  let component: ProbationMgmtComponent;
  let fixture: ComponentFixture<ProbationMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProbationMgmtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProbationMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
