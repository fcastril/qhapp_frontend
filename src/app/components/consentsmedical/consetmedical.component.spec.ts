import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsetmedicalComponent } from './consetmedical.component';

describe('ConsetmedicalComponent', () => {
  let component: ConsetmedicalComponent;
  let fixture: ComponentFixture<ConsetmedicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsetmedicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsetmedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
