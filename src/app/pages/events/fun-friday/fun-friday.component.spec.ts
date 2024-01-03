import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunFridayComponent } from './fun-friday.component';

describe('FunFridayComponent', () => {
  let component: FunFridayComponent;
  let fixture: ComponentFixture<FunFridayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunFridayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunFridayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
