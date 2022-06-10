import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePatientComponent } from './recipe-patient.component';

describe('RecipePatientComponent', () => {
  let component: RecipePatientComponent;
  let fixture: ComponentFixture<RecipePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipePatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
