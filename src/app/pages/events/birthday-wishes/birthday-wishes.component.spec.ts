import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdayWishesComponent } from './birthday-wishes.component';

describe('BirthdayWishesComponent', () => {
  let component: BirthdayWishesComponent;
  let fixture: ComponentFixture<BirthdayWishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirthdayWishesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirthdayWishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
