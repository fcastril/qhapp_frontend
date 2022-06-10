import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementEntriesComponent } from './movement-entries.component';

describe('MovementEntriesComponent', () => {
  let component: MovementEntriesComponent;
  let fixture: ComponentFixture<MovementEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovementEntriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
