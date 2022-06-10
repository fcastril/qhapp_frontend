import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMeasureComponent } from './type-measure.component';

describe('TypeMeasureComponent', () => {
  let component: TypeMeasureComponent;
  let fixture: ComponentFixture<TypeMeasureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeMeasureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
