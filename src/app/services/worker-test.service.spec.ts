import { TestBed } from '@angular/core/testing';

import { WorkerTestService } from './worker-test.service';

describe('WorkerTestService', () => {
  let service: WorkerTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkerTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
