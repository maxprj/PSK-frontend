import { TestBed } from '@angular/core/testing';

import { DefaultRootService } from './default-root.service';

describe('DefaultRootService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DefaultRootService = TestBed.get(DefaultRootService);
    expect(service).toBeTruthy();
  });
});
