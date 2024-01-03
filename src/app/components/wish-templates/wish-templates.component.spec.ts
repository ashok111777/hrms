import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishTemplatesComponent } from './wish-templates.component';

describe('WishTemplatesComponent', () => {
  let component: WishTemplatesComponent;
  let fixture: ComponentFixture<WishTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishTemplatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
