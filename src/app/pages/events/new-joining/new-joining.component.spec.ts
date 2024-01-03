import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJoiningComponent } from './new-joining.component';

describe('NewJoiningComponent', () => {
  let component: NewJoiningComponent;
  let fixture: ComponentFixture<NewJoiningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewJoiningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewJoiningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
