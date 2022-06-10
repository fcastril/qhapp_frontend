import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesMeasuresComponent } from './types-measures.component';

describe('TypesMeasuresComponent', () => {
  let component: TypesMeasuresComponent;
  let fixture: ComponentFixture<TypesMeasuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesMeasuresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesMeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
