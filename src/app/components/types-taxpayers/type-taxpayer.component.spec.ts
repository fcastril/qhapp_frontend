import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeTaxpayerComponent } from './type-taxpayer.component';

describe('TypeTaxpayerComponent', () => {
  let component: TypeTaxpayerComponent;
  let fixture: ComponentFixture<TypeTaxpayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeTaxpayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeTaxpayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
