import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtreatmentdetailComponent } from './viewtreatmentdetail.component';

describe('ViewtreatmentdetailComponent', () => {
  let component: ViewtreatmentdetailComponent;
  let fixture: ComponentFixture<ViewtreatmentdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewtreatmentdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtreatmentdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
