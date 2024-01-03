import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmgmtDetailsComponent } from './productmgmt-details.component';

describe('ProductmgmtDetailsComponent', () => {
  let component: ProductmgmtDetailsComponent;
  let fixture: ComponentFixture<ProductmgmtDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductmgmtDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductmgmtDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
