import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationsShipsComponent } from './relations-ships.component';

describe('RelationsShipsComponent', () => {
  let component: RelationsShipsComponent;
  let fixture: ComponentFixture<RelationsShipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelationsShipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationsShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
