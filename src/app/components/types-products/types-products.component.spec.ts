import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesProductsComponent } from './types-products.component';

describe('TypesProductsComponent', () => {
  let component: TypesProductsComponent;
  let fixture: ComponentFixture<TypesProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
