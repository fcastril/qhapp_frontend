import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditPhotographicEvolutionComponent } from './create-edit-photographic-evolution.component';

describe('CreateEditPhotographicEvolutionComponent', () => {
  let component: CreateEditPhotographicEvolutionComponent;
  let fixture: ComponentFixture<CreateEditPhotographicEvolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditPhotographicEvolutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditPhotographicEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
