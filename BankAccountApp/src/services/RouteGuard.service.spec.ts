/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouteGuardService } from './RouteGuard.service';

describe('Service: RouteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteGuardService]
    });
  });

  it('should ...', inject([RouteGuardService], (service: RouteGuardService) => {
    expect(service).toBeTruthy();
  }));
});
