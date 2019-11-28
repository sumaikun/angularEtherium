import { TestBed } from '@angular/core/testing';

import { ContractsServicesService } from './contracts-services.service';

describe('ContractsServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContractsServicesService = TestBed.get(ContractsServicesService);
    expect(service).toBeTruthy();
  });
});
