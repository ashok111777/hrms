import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KudosWishesComponent } from './kudos-wishes.component';

describe('KudosWishesComponent', () => {
  let component: KudosWishesComponent;
  let fixture: ComponentFixture<KudosWishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KudosWishesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KudosWishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
