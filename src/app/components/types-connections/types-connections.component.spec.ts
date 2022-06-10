import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesConnectionsComponent } from './types-connections.component';

describe('TypesConnectionsComponent', () => {
  let component: TypesConnectionsComponent;
  let fixture: ComponentFixture<TypesConnectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesConnectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
