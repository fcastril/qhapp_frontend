import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesAgendasComponent } from './types-agendas.component';

describe('TypesAgendasComponent', () => {
  let component: TypesAgendasComponent;
  let fixture: ComponentFixture<TypesAgendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesAgendasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesAgendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
