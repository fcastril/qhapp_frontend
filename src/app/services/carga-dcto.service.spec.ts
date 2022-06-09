import { TestBed } from '@angular/core/testing';

import { CargaDctoService } from './carga-dcto.service';

describe('CargaDctoService', () => {
  let service: CargaDctoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaDctoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
