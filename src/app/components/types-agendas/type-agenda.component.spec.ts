import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAgendaComponent } from './type-agenda.component';

describe('TypeAgendaComponent', () => {
  let component: TypeAgendaComponent;
  let fixture: ComponentFixture<TypeAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeAgendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
