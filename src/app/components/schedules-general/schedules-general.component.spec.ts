import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesGeneralComponent } from './schedules-general.component';

describe('SchedulesGeneralComponent', () => {
  let component: SchedulesGeneralComponent;
  let fixture: ComponentFixture<SchedulesGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulesGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
