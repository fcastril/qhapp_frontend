import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdverseEventComponent } from './adverse-event.component';

describe('AdverseEventComponent', () => {
  let component: AdverseEventComponent;
  let fixture: ComponentFixture<AdverseEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdverseEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdverseEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
