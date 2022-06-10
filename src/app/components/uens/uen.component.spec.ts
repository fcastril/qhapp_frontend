import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UenComponent } from './uen.component';

describe('UenComponent', () => {
  let component: UenComponent;
  let fixture: ComponentFixture<UenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
