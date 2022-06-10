import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesTaxpayersComponent } from './types-taxpayers.component';

describe('TypesTaxpayersComponent', () => {
  let component: TypesTaxpayersComponent;
  let fixture: ComponentFixture<TypesTaxpayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesTaxpayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesTaxpayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
