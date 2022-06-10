import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePatientPrintComponent } from './recipe-patient-print.component';

describe('RecipePatientPrintComponent', () => {
  let component: RecipePatientPrintComponent;
  let fixture: ComponentFixture<RecipePatientPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipePatientPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipePatientPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
