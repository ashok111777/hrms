import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFestivalComponent } from './add-edit-festival.component';

describe('AddEditFestivalComponent', () => {
  let component: AddEditFestivalComponent;
  let fixture: ComponentFixture<AddEditFestivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFestivalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditFestivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
