import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationShipComponent } from './relation-ship.component';

describe('RelationShipComponent', () => {
  let component: RelationShipComponent;
  let fixture: ComponentFixture<RelationShipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelationShipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
