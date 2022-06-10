import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesMovementsComponent } from './types-movements.component';

describe('TypesMovementsComponent', () => {
  let component: TypesMovementsComponent;
  let fixture: ComponentFixture<TypesMovementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesMovementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
