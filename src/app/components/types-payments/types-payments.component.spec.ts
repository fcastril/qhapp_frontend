import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesPaymentsComponent } from './types-payments.component';

describe('TypesPaymentsComponent', () => {
  let component: TypesPaymentsComponent;
  let fixture: ComponentFixture<TypesPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesPaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
