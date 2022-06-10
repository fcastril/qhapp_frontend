import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonsMovementsComponent } from './reasons-movements.component';

describe('ReasonsMovementsComponent', () => {
  let component: ReasonsMovementsComponent;
  let fixture: ComponentFixture<ReasonsMovementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReasonsMovementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonsMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
