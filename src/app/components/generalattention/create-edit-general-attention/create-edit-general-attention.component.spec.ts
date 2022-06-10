import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditGeneralAttentionComponent } from './create-edit-general-attention.component';

describe('CreateEditGeneralAttentionComponent', () => {
  let component: CreateEditGeneralAttentionComponent;
  let fixture: ComponentFixture<CreateEditGeneralAttentionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditGeneralAttentionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditGeneralAttentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
