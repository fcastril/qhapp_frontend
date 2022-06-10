import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UensComponent } from './uens.component';

describe('UensComponent', () => {
  let component: UensComponent;
  let fixture: ComponentFixture<UensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
