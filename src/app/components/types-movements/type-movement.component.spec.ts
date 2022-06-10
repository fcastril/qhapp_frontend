import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMovementComponent } from './type-movement.component';

describe('TypeMovementComponent', () => {
  let component: TypeMovementComponent;
  let fixture: ComponentFixture<TypeMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeMovementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
