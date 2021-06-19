import { TestBed } from '@angular/core/testing';

import { DietaEstablecidaService } from './dieta-establecida.service';

describe('DietaEstablecidaService', () => {
  let service: DietaEstablecidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DietaEstablecidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
