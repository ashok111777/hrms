import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLocationsComponent } from './user-locations.component';

describe('UserLocationsComponent', () => {
  let component: UserLocationsComponent;
  let fixture: ComponentFixture<UserLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLocationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
