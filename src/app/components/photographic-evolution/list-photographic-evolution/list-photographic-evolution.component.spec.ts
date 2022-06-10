import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPhotographicEvolutionComponent } from './list-photographic-evolution.component';

describe('ListPhotographicEvolutionComponent', () => {
  let component: ListPhotographicEvolutionComponent;
  let fixture: ComponentFixture<ListPhotographicEvolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPhotographicEvolutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPhotographicEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
