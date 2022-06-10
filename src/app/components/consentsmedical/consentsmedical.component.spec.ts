import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentsmedicalComponent } from './consentsmedical.component';

describe('ConsentsmedicalComponent', () => {
  let component: ConsentsmedicalComponent;
  let fixture: ComponentFixture<ConsentsmedicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsentsmedicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentsmedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
