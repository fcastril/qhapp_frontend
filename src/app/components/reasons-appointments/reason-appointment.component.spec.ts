import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonAppointmentComponent } from './reason-appointment.component';

describe('ReasonAppointmentComponent', () => {
  let component: ReasonAppointmentComponent;
  let fixture: ComponentFixture<ReasonAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReasonAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
