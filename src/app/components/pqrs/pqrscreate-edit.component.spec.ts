import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PqrscreateEditComponent } from './pqrscreate-edit.component';

describe('PqrscreateEditComponent', () => {
  let component: PqrscreateEditComponent;
  let fixture: ComponentFixture<PqrscreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PqrscreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PqrscreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
