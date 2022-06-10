import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryChildComponent } from './medical-history-child.component';

describe('MedicalHistoryChildComponent', () => {
  let component: MedicalHistoryChildComponent;
  let fixture: ComponentFixture<MedicalHistoryChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalHistoryChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalHistoryChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
