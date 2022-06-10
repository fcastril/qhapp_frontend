import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentRecordComponent } from './appointment-record.component';

describe('AppointmentRecordComponent', () => {
  let component: AppointmentRecordComponent;
  let fixture: ComponentFixture<AppointmentRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
