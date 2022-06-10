import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDailyAgendaComponent } from './list-daily-agenda.component';

describe('ListDailyAgendaComponent', () => {
  let component: ListDailyAgendaComponent;
  let fixture: ComponentFixture<ListDailyAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDailyAgendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDailyAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
