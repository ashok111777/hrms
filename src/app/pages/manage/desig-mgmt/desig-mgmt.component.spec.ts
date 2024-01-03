import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesigMgmtComponent } from './desig-mgmt.component';

describe('DesigMgmtComponent', () => {
  let component: DesigMgmtComponent;
  let fixture: ComponentFixture<DesigMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesigMgmtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesigMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
