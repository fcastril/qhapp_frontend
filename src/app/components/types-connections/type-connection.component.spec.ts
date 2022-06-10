import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeConnectionComponent } from './type-connection.component';

describe('TypeConnectionComponent', () => {
  let component: TypeConnectionComponent;
  let fixture: ComponentFixture<TypeConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeConnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
