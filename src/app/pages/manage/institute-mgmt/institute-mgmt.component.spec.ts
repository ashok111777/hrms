import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteMgmtComponent } from './institute-mgmt.component';

describe('InstituteMgmtComponent', () => {
  let component: InstituteMgmtComponent;
  let fixture: ComponentFixture<InstituteMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstituteMgmtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstituteMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
