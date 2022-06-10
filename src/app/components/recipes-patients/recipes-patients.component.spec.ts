import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesPatientsComponent } from './recipes-patients.component';

describe('RecipesPatientsComponent', () => {
  let component: RecipesPatientsComponent;
  let fixture: ComponentFixture<RecipesPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipesPatientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
