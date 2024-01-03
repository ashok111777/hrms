import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJoiningTemplateComponent } from './new-joining-template.component';

describe('NewJoiningTemplateComponent', () => {
  let component: NewJoiningTemplateComponent;
  let fixture: ComponentFixture<NewJoiningTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewJoiningTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewJoiningTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
