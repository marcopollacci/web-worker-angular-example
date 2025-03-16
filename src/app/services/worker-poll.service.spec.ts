import { TestBed } from '@angular/core/testing';

import { WorkerPollService } from './worker-poll.service';

describe('WorkerPollService', () => {
  let service: WorkerPollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkerPollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
