import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAttachedDocumentComponent } from './list-attached-document.component';

describe('ListAttachedDocumentComponent', () => {
  let component: ListAttachedDocumentComponent;
  let fixture: ComponentFixture<ListAttachedDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAttachedDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAttachedDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
