/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MedService } from './med.service';

describe('Service: Med', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedService]
    });
  });

  it('should ...', inject([MedService], (service: MedService) => {
    expect(service).toBeTruthy();
  }));
});
