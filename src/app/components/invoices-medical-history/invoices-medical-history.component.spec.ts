import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesMedicalHistoryComponent } from './invoices-medical-history.component';

describe('InvoicesMedicalHistoryComponent', () => {
  let component: InvoicesMedicalHistoryComponent;
  let fixture: ComponentFixture<InvoicesMedicalHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicesMedicalHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicesMedicalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
