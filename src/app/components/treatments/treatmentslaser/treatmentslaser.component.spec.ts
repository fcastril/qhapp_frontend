import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentslaserComponent } from './treatmentslaser.component';

describe('TreatmentslaserComponent', () => {
  let component: TreatmentslaserComponent;
  let fixture: ComponentFixture<TreatmentslaserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatmentslaserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentslaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
