import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsMeasureControlComponent } from './graphics-measure-control.component';

describe('GraphicsMeasureControlComponent', () => {
  let component: GraphicsMeasureControlComponent;
  let fixture: ComponentFixture<GraphicsMeasureControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicsMeasureControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicsMeasureControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
