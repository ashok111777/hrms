import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWishesComponent } from './login-wishes.component';

describe('LoginWishesComponent', () => {
  let component: LoginWishesComponent;
  let fixture: ComponentFixture<LoginWishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginWishesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginWishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
