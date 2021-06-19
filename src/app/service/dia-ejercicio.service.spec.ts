import { TestBed } from '@angular/core/testing';

import { DiaEjercicioService } from './dia-ejercicio.service';

describe('DiaEjercicioService', () => {
  let service: DiaEjercicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiaEjercicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
