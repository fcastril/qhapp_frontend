import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusAppointmentComponent } from './status-appointment.component';

describe('StatusAppointmentComponent', () => {
  let component: StatusAppointmentComponent;
  let fixture: ComponentFixture<StatusAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
