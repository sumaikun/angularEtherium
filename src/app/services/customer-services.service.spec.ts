import { TestBed } from '@angular/core/testing';

import { CustomerServicesclearService } from './customer-servicesclear.service';

describe('CustomerServicesclearService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerServicesclearService = TestBed.get(CustomerServicesclearService);
    expect(service).toBeTruthy();
  });
});
