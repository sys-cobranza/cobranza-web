import { TestBed, inject } from '@angular/core/testing';

import { CobranzaService } from './cobranza.service';

describe('CobranzaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CobranzaService]
    });
  });

  it('should be created', inject([CobranzaService], (service: CobranzaService) => {
    expect(service).toBeTruthy();
  }));
});
