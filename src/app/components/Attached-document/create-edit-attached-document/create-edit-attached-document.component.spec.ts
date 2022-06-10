import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditAttachedDocumentComponent } from './create-edit-attached-document.component';

describe('CreateEditAttachedDocumentComponent', () => {
  let component: CreateEditAttachedDocumentComponent;
  let fixture: ComponentFixture<CreateEditAttachedDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditAttachedDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditAttachedDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
