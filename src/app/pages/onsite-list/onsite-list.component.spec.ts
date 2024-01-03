import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsiteListComponent } from './onsite-list.component';

describe('OnsiteListComponent', () => {
  let component: OnsiteListComponent;
  let fixture: ComponentFixture<OnsiteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnsiteListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnsiteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
