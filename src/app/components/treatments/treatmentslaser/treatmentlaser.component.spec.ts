import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentlaserComponent } from './treatmentlaser.component';

describe('TreatmentlaserComponent', () => {
  let component: TreatmentlaserComponent;
  let fixture: ComponentFixture<TreatmentlaserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatmentlaserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentlaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
