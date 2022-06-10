import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeHearaboutComponent } from './type-hearabout.component';

describe('TypeHearaboutComponent', () => {
  let component: TypeHearaboutComponent;
  let fixture: ComponentFixture<TypeHearaboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeHearaboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeHearaboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
