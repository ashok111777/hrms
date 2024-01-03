import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthListComponent } from './birth-list.component';

describe('BirthListComponent', () => {
  let component: BirthListComponent;
  let fixture: ComponentFixture<BirthListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirthListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirthListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
