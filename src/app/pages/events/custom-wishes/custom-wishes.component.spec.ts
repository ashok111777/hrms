import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomWishesComponent } from './custom-wishes.component';

describe('CustomWishesComponent', () => {
  let component: CustomWishesComponent;
  let fixture: ComponentFixture<CustomWishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomWishesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomWishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
