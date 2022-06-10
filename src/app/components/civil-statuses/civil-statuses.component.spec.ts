import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CivilStatusesComponent } from './civil-statuses.component';

describe('CivilStatusesComponent', () => {
  let component: CivilStatusesComponent;
  let fixture: ComponentFixture<CivilStatusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CivilStatusesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CivilStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
