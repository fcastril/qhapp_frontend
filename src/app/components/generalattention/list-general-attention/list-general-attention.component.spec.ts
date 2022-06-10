import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGeneralAttentionComponent } from './list-general-attention.component';

describe('ListGeneralAttentionComponent', () => {
  let component: ListGeneralAttentionComponent;
  let fixture: ComponentFixture<ListGeneralAttentionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGeneralAttentionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGeneralAttentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
