import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesHearaboutComponent } from './types-hearabout.component';

describe('TypesHearaboutComponent', () => {
  let component: TypesHearaboutComponent;
  let fixture: ComponentFixture<TypesHearaboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesHearaboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesHearaboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
