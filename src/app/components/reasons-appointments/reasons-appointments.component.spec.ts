import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonsAppointmentsComponent } from './reasons-appointments.component';

describe('ReasonsAppointmentsComponent', () => {
  let component: ReasonsAppointmentsComponent;
  let fixture: ComponentFixture<ReasonsAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReasonsAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonsAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
