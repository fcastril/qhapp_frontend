import { TestBed } from '@angular/core/testing';

import { CargaDcto } from './carga-dcto.service';

describe('CargaDcto.ServiceService', () => {
  let service: CargaDcto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaDcto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
