import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesPricelistsComponent } from './types-pricelists.component';

describe('TypesPricelistsComponent', () => {
  let component: TypesPricelistsComponent;
  let fixture: ComponentFixture<TypesPricelistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesPricelistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesPricelistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
