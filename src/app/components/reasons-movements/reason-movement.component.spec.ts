import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonMovementComponent } from './reason-movement.component';

describe('ReasonMovementComponent', () => {
  let component: ReasonMovementComponent;
  let fixture: ComponentFixture<ReasonMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReasonMovementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
