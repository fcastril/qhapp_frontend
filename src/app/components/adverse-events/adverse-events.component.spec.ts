import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdverseEventsComponent } from './adverse-events.component';

describe('AdverseEventsComponent', () => {
  let component: AdverseEventsComponent;
  let fixture: ComponentFixture<AdverseEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdverseEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdverseEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
