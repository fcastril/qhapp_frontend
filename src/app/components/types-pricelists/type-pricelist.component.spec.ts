import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePricelistComponent } from './type-pricelist.component';

describe('TypePricelistComponent', () => {
  let component: TypePricelistComponent;
  let fixture: ComponentFixture<TypePricelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypePricelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypePricelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
