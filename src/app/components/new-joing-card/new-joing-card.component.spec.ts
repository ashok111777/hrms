import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJoingCardComponent } from './new-joing-card.component';

describe('NewJoingCardComponent', () => {
  let component: NewJoingCardComponent;
  let fixture: ComponentFixture<NewJoingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewJoingCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewJoingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
