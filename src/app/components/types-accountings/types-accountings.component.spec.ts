import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesAccountingsComponent } from './types-accountings.component';

describe('TypesAccountingsComponent', () => {
  let component: TypesAccountingsComponent;
  let fixture: ComponentFixture<TypesAccountingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesAccountingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesAccountingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
