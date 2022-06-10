import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusAppointmentsComponent } from './status-appointments.component';

describe('StatusAppointmentsComponent', () => {
  let component: StatusAppointmentsComponent;
  let fixture: ComponentFixture<StatusAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
