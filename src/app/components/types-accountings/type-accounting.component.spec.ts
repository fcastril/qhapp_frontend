import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAccountingComponent } from './type-accounting.component';

describe('TypeAccountingComponent', () => {
  let component: TypeAccountingComponent;
  let fixture: ComponentFixture<TypeAccountingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeAccountingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeAccountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
